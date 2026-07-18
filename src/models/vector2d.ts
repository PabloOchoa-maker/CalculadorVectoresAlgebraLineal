/**
 * Vector en el plano. Portado de Vector2D.java.
 * Inmutable: los servicios devuelven vectores nuevos en vez de mutar.
 */
export class Vector2D {
  constructor(
    public readonly x: number,
    public readonly y: number
  ) {}
}
