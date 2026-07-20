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
   * Ángulo polar en grados, normalizado a 0–360. De Conversiones.angulo().
   * Medido desde el Este (+X) en sentido antihorario. atan2 devuelve
   * -180..180; le sumamos 360 a los negativos.
   */
  angulo(v: Vector2D): number {
    const a = aGrados(Math.atan2(v.y, v.x));
    return a < 0 ? a + 360 : a;
  }

  /**
   * Ángulo geográfico (acimut/rumbo) en grados, normalizado a 0–360.
   * Medido desde el Norte (+Y) en sentido horario: 0°=N, 90°=E, 180°=S, 270°=O.
   * Es el mismo atan2 que el polar pero con x e y intercambiados, que es lo
   * que refleja la referencia distinta (desde el Norte, no desde el Este).
   */
  anguloGeografico(v: Vector2D): number {
    const a = aGrados(Math.atan2(v.x, v.y));
    return a < 0 ? a + 360 : a;
  }

  /**
   * Lleva cualquier entrada a rectangular, que es el único sistema
   * en el que se calcula. Polar mide θ desde el Este antihorario;
   * geográfica mide θ desde el Norte en sentido horario, así que sus
   * fórmulas de conversión no son iguales.
   */
  aRectangular(e: Entrada2D): Vector2D {
    if (e.sistema === 'rectangular') {
      return new Vector2D(e.a, e.b);
    }
    const rad = aRadianes(e.b);
    if (e.sistema === 'geografica') {
      // Acimut desde el Norte, horario: x = r·sin(θ), y = r·cos(θ).
      return new Vector2D(e.a * Math.sin(rad), e.a * Math.cos(rad));
    }
    // Polar desde el Este, antihorario: x = r·cos(θ), y = r·sin(θ).
    return new Vector2D(e.a * Math.cos(rad), e.a * Math.sin(rad));
  }

  aPolar(v: Vector2D): Polar {
    const r = this.magnitud(v);
    return { r, theta: r < EPSILON ? 0 : this.angulo(v) };
  }

  /** Geográfica real: acimut desde el Norte, horario. Ya no es igual a polar. */
  aGeografica(v: Vector2D): Polar {
    const r = this.magnitud(v);
    return { r, theta: r < EPSILON ? 0 : this.anguloGeografico(v) };
  }
}
