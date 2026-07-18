import { Vector2D } from '../models/vector2d';
import { Vector3D } from '../models/vector3d';

/**
 * Operaciones sobre vectores del plano.
 * Recibe vectores YA en rectangular: convertir es tarea del controller.
 */
export class Operaciones2DService {
  /** Producto punto. De Operaciones2D.java:14. */
  productoPunto(a: Vector2D, b: Vector2D): number {
    return a.x * b.x + a.y * b.y;
  }

  /**
   * Producto cruz de dos vectores del plano.
   *
   * El resultado NO vive en el plano: es perpendicular a él, sobre el eje Z.
   * Por eso devuelve un Vector3D (0, 0, k) y no un Vector2D. El valor k es
   * el área con signo del paralelogramo que forman A y B:
   *   k > 0 -> giro antihorario de A hacia B
   *   k < 0 -> giro horario
   *   k = 0 -> A y B son paralelos
   */
  productoCruz(a: Vector2D, b: Vector2D): Vector3D {
    return new Vector3D(0, 0, a.x * b.y - a.y * b.x);
  }
}
