import { Vector3D } from '../models/vector3d';
import type { Entrada3D, Cilindrica } from '../models/coordenadas';
import { aRadianes, aGrados } from './angulos.service';

/** Por debajo de este radio el ángulo cilíndrico es indefinido. */
const EPSILON = 1e-10;

/**
 * Conversiones de vectores del espacio.
 * En cilíndricas, r y theta describen la proyección sobre el plano XY;
 * z se mantiene tal cual.
 */
export class Conversiones3DService {
  /** Lleva cualquier entrada a rectangular, el único sistema en el que se calcula. */
  aRectangular(e: Entrada3D): Vector3D {
    if (e.sistema === 'rectangular') {
      return new Vector3D(e.a, e.b, e.c);
    }
    const rad = aRadianes(e.b);
    return new Vector3D(e.a * Math.cos(rad), e.a * Math.sin(rad), e.c);
  }

  /**
   * theta queda en null cuando el vector cae sobre el eje Z (r = 0):
   * ahí el ángulo no está definido. Devolver 0 sería inventar un dato.
   */
  aCilindrica(v: Vector3D): Cilindrica {
    const r = Math.hypot(v.x, v.y);
    if (r < EPSILON) {
      return { r: 0, theta: null, z: v.z };
    }
    const a = aGrados(Math.atan2(v.y, v.x));
    return { r, theta: a < 0 ? a + 360 : a, z: v.z };
  }
}
