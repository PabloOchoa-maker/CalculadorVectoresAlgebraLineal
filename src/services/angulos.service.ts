/**
 * Utilidades de ángulos, independientes de 2D o 3D.
 * Grados es la unidad de la interfaz; radianes solo se usan puertas adentro
 * de los cálculos trigonométricos. Viven aparte para que ni 2D ni 3D
 * dependan uno del otro solo por compartir estas fórmulas.
 */

export function aRadianes(grados: number): number {
  return (grados * Math.PI) / 180;
}

export function aGrados(radianes: number): number {
  return (radianes * 180) / Math.PI;
}
