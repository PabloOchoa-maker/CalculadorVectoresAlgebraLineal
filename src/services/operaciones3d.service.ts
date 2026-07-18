import { Vector3D } from '../models/vector3d';

/**
 * Operaciones sobre vectores del espacio.
 * Recibe vectores YA en rectangular: convertir es tarea del controller.
 */
export class Operaciones3DService {
  /** Producto punto. De Operaciones3D.java:14. */
  productoPunto(a: Vector3D, b: Vector3D): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  /** Producto cruz. De Operaciones3D.java:16-18. */
  productoCruz(a: Vector3D, b: Vector3D): Vector3D {
    return new Vector3D(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    );
  }
}
