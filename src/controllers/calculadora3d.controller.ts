import { Calculadora3DView } from '../views/calculadora3d.view';
import { Conversiones3DService } from '../services/conversiones3d.service';
import { Operaciones3DService } from '../services/operaciones3d.service';
import { FormatoService } from '../services/formato.service';
import { Vector3D } from '../models/vector3d';
import type { Resultado3D, VectorEnEstilos3D } from '../models/resultado';

/**
 * Orquesta el flujo 3D: leer entrada -> convertir a rectangular -> calcular
 * -> formatear -> mostrar. No calcula ni formatea por su cuenta: delega.
 */
export class Calculadora3DController {
  constructor(
    private readonly view: Calculadora3DView,
    private readonly conv: Conversiones3DService,
    private readonly ops: Operaciones3DService,
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
      cruzCilindrica: this.fmt.cilindrica(this.conv.aCilindrica(cruz))
    } satisfies Resultado3D);
  }

  /** Ecoa un vector de entrada en ambos estilos. */
  private enEstilos(nombre: string, v: Vector3D): VectorEnEstilos3D {
    return {
      nombre,
      rectangular: this.fmt.rectangular3D(v),
      cilindrica: this.fmt.cilindrica(this.conv.aCilindrica(v))
    };
  }
}
