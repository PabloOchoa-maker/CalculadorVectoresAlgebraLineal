import { Vector2D } from '../models/vector2d';
import type { Entrada2D, Polar } from '../models/coordenadas';
import { aRadianes, aGrados } from './angulos.service';

/** Por debajo de esta magnitud un vector se considera nulo (evita ángulos con ruido). */
const EPSILON = 1e-10;

/**
 * Conversiones de vectores del plano.
 * Porta magnitud() y angulo() de Conversiones.java.
 *
 * Los grados son la unidad de la interfaz; los radianes solo viven aquí dentro.
 */
export class Conversiones2DService {
  /** Magnitud del vector. De Conversiones.magnitud(). */
  magnitud(v: Vector2D): number {
    return Math.hypot(v.x, v.y);
  }

  /**
   * Ángulo en grados, normalizado a 0–360. De Conversiones.angulo().
   * atan2 devuelve -180..180; le sumamos 360 a los negativos.
   */
  angulo(v: Vector2D): number {
    const a = aGrados(Math.atan2(v.y, v.x));
    return a < 0 ? a + 360 : a;
  }

  /**
   * Lleva cualquier entrada a rectangular, que es el único sistema
   * en el que se calcula. Polar y geográfica comparten fórmula porque
   * se definieron idénticas (Este = 0°, antihorario).
   */
  aRectangular(e: Entrada2D): Vector2D {
    if (e.sistema === 'rectangular') {
      return new Vector2D(e.a, e.b);
    }
    const rad = aRadianes(e.b);
    return new Vector2D(e.a * Math.cos(rad), e.a * Math.sin(rad));
  }

  aPolar(v: Vector2D): Polar {
    const r = this.magnitud(v);
    return { r, theta: r < EPSILON ? 0 : this.angulo(v) };
  }

  /** Geográfica es idéntica a polar por decisión de diseño. */
  aGeografica(v: Vector2D): Polar {
    return this.aPolar(v);
  }
}
