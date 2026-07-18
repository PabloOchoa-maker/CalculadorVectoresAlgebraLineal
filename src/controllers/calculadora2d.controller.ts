import { Calculadora2DView } from '../views/calculadora2d.view';
import { Conversiones2DService } from '../services/conversiones2d.service';
import { Conversiones3DService } from '../services/conversiones3d.service';
import { Operaciones2DService } from '../services/operaciones2d.service';
import { FormatoService } from '../services/formato.service';
import { Vector2D } from '../models/vector2d';
import type { Resultado2D, VectorEnEstilos2D } from '../models/resultado';

/**
 * Orquesta el flujo 2D: leer entrada -> convertir a rectangular -> calcular
 * -> formatear -> mostrar. No calcula ni formatea por su cuenta: delega.
 */
export class Calculadora2DController {
  // El cruz 2D devuelve un Vector3D, así que hace falta el conversor 3D
  // para expresarlo en cilíndricas.
  private readonly conv3d = new Conversiones3DService();

  constructor(
    private readonly view: Calculadora2DView,
    private readonly conv: Conversiones2DService,
    private readonly ops: Operaciones2DService,
    private readonly fmt: FormatoService
  ) {
    this.view.onCambio(() => this.calcular());
    this.calcular();
  }

  private calcular(): void {
    const { a, b } = this.view.leerEntradas();

    // Toda entrada se lleva a rectangular: es el único sistema en el que se opera.
    const va = this.conv.aRectangular(a);
    const vb = this.conv.aRectangular(b);

    const punto = this.ops.productoPunto(va, vb);
    const cruz = this.ops.productoCruz(va, vb);

    this.view.mostrar({
      entradas: [this.enEstilos('A', va), this.enEstilos('B', vb)],
      productoPunto: this.fmt.numero(punto),
      cruzRectangular: this.fmt.rectangular3D(cruz),
      cruzCilindrica: this.fmt.cilindrica(this.conv3d.aCilindrica(cruz)),
      cruzInterpretacion: this.interpretar(cruz.z)
    } satisfies Resultado2D);
  }

  /** Ecoa un vector de entrada en los tres estilos. */
  private enEstilos(nombre: string, v: Vector2D): VectorEnEstilos2D {
    return {
      nombre,
      rectangular: this.fmt.rectangular2D(v),
      polar: this.fmt.polar(this.conv.aPolar(v)),
      geografica: this.fmt.geografica(this.conv.aGeografica(v))
    };
  }

  /** El signo de k dice el sentido de giro; su magnitud, el área del paralelogramo. */
  private interpretar(k: number): string {
    const area = this.fmt.numero(Math.abs(k));
    if (k === 0) {
      return 'k = 0: A y B son paralelos (o alguno es nulo). No forman paralelogramo.';
    }
    const giro = k > 0 ? 'antihorario' : 'horario';
    return `k ${k > 0 ? '>' : '<'} 0: el giro de A hacia B es ${giro}. El área del paralelogramo que forman es ${area}.`;
  }
}
