import { Vector2D } from '../models/vector2d';
import { Vector3D } from '../models/vector3d';
import type { Polar, Cilindrica } from '../models/coordenadas';

const DECIMALES = 4;

/**
 * Único lugar de la app que decide cómo se ve un número.
 * Mantenerlo aparte evita que el formateo se filtre a los servicios de
 * cálculo, que fue el problema del Java original (println mezclado con math).
 */
export class FormatoService {
  /** Redondea y limpia ceros de cola: 2.0000 -> "2", 3.14159 -> "3.1416". */
  numero(n: number): string {
    // Normaliza el -0 que produce atan2/multiplicaciones, que se vería como "-0".
    const limpio = Object.is(n, -0) ? 0 : n;
    return Number(limpio.toFixed(DECIMALES)).toString();
  }

  rectangular2D(v: Vector2D): string {
    return `(${this.numero(v.x)}, ${this.numero(v.y)})`;
  }

  rectangular3D(v: Vector3D): string {
    return `(${this.numero(v.x)}, ${this.numero(v.y)}, ${this.numero(v.z)})`;
  }

  polar(p: Polar): string {
    return `r = ${this.numero(p.r)} · θ = ${this.numero(p.theta)}°`;
  }

  /** Geográfica se muestra igual que polar: se definieron idénticas. */
  geografica(p: Polar): string {
    return this.polar(p);
  }

  /** Cuando theta es null (vector sobre el eje Z) se muestra "n/d", no un cero falso. */
  cilindrica(c: Cilindrica): string {
    const theta = c.theta === null ? 'n/d' : `${this.numero(c.theta)}°`;
    return `r = ${this.numero(c.r)} · θ = ${theta} · z = ${this.numero(c.z)}`;
  }
}
