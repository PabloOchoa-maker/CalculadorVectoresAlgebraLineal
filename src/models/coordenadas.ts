/** Sistemas en los que el usuario puede ingresar un vector del plano. */
export type Sistema2D = 'rectangular' | 'polar' | 'geografica';

/** Sistemas en los que el usuario puede ingresar un vector del espacio. */
export type Sistema3D = 'rectangular' | 'cilindrica';

/**
 * Entrada cruda del usuario para un vector 2D.
 * El significado de `a` y `b` depende del sistema:
 *   rectangular -> (x, y)
 *   polar       -> (r, theta en grados)
 *   geografica  -> (r, theta en grados)   [idéntica a polar por decisión]
 */
export interface Entrada2D {
  sistema: Sistema2D;
  a: number;
  b: number;
}

/**
 * Entrada cruda del usuario para un vector 3D.
 *   rectangular -> (x, y, z)
 *   cilindrica  -> (r, theta en grados, z)
 */
export interface Entrada3D {
  sistema: Sistema3D;
  a: number;
  b: number;
  c: number;
}

/** Vector del plano expresado en polar (o geográfica). Ángulo en grados 0–360. */
export interface Polar {
  r: number;
  theta: number;
}

/**
 * Vector del espacio expresado en cilíndricas. Ángulo en grados 0–360.
 * `theta` es null cuando r = 0: sobre el eje Z el ángulo es indefinido,
 * no cero. Es el caso del producto cruz 2D, que siempre da (0, 0, k).
 */
export interface Cilindrica {
  r: number;
  theta: number | null;
  z: number;
}
