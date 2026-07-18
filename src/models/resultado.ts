/**
 * Modelos de resultado: lo que el controller le entrega a la vista, ya
 * formateado como texto. La vista solo pinta; no calcula ni formatea.
 */

/** Un vector de entrada ecoado en todos sus estilos. */
export interface VectorEnEstilos2D {
  nombre: string;
  rectangular: string;
  polar: string;
  geografica: string;
}

export interface VectorEnEstilos3D {
  nombre: string;
  rectangular: string;
  cilindrica: string;
}

export interface Resultado2D {
  entradas: VectorEnEstilos2D[];
  productoPunto: string;
  /** El cruz 2D sale del plano: se muestra como vector 3D. */
  cruzRectangular: string;
  cruzCilindrica: string;
  /** Lectura del signo de k: sentido de giro de A hacia B. */
  cruzInterpretacion: string;
}

export interface Resultado3D {
  entradas: VectorEnEstilos3D[];
  productoPunto: string;
  cruzRectangular: string;
  cruzCilindrica: string;
}
