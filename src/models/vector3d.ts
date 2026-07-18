/**
 * Vector en el espacio. Portado de Vector3D.java.
 * Inmutable: los servicios devuelven vectores nuevos en vez de mutar.
 */
export class Vector3D {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) {}
}
