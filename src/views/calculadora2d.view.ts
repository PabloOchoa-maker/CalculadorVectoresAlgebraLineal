import { VectorInputView, type ConfigSistema } from './vector-input.view';
import type { Entrada2D, Sistema2D } from '../models/coordenadas';
import type { Resultado2D } from '../models/resultado';

const SISTEMAS_2D: ConfigSistema[] = [
  { valor: 'rectangular', etiqueta: 'Rectangular', campos: ['x', 'y'] },
  { valor: 'polar', etiqueta: 'Polar', campos: ['r', 'θ (°)'] },
  { valor: 'geografica', etiqueta: 'Geográfica', campos: ['r', 'θ (°)'] }
];

export class Calculadora2DView {
  private readonly vectorA: VectorInputView;
  private readonly vectorB: VectorInputView;
  private readonly salida: HTMLElement;

  constructor(contenedor: HTMLElement) {
    const entradas = document.createElement('div');
    entradas.className = 'entradas';
    contenedor.appendChild(entradas);

    this.vectorA = new VectorInputView(entradas, 'A', SISTEMAS_2D, 2);
    this.vectorB = new VectorInputView(entradas, 'B', SISTEMAS_2D, 2);

    this.salida = document.createElement('div');
    this.salida.className = 'salida';
    contenedor.appendChild(this.salida);
  }

  leerEntradas(): { a: Entrada2D; b: Entrada2D } {
    const [ax, ay] = this.vectorA.valores;
    const [bx, by] = this.vectorB.valores;
    return {
      a: { sistema: this.vectorA.sistema as Sistema2D, a: ax, b: ay },
      b: { sistema: this.vectorB.sistema as Sistema2D, a: bx, b: by }
    };
  }

  /** Recalcula en vivo: cualquier cambio de sistema o de número dispara el cálculo. */
  onCambio(cb: () => void): void {
    this.vectorA.onCambio(cb);
    this.vectorB.onCambio(cb);
  }

  mostrar(r: Resultado2D): void {
    this.salida.innerHTML = `
      <section class="bloque">
        <h3>Vectores ingresados, en todos sus estilos</h3>
        <table class="tabla-estilos">
          <thead>
            <tr><th></th><th>Rectangular</th><th>Polar</th><th>Geográfica</th></tr>
          </thead>
          <tbody>
            ${r.entradas
              .map(
                (v) => `<tr>
                  <th>${v.nombre}</th>
                  <td>${v.rectangular}</td>
                  <td>${v.polar}</td>
                  <td>${v.geografica}</td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </section>

      <section class="bloque">
        <h3>Producto punto</h3>
        <p class="escalar">A · B = <strong>${r.productoPunto}</strong></p>
        <p class="nota">El producto punto es un escalar: no tiene dirección, así que no se expresa en sistemas de coordenadas.</p>
      </section>

      <section class="bloque">
        <h3>Producto cruz</h3>
        <p class="nota nota--destacada">
          El producto cruz de dos vectores del plano es perpendicular al plano:
          apunta sobre el eje Z. Por eso se muestra como vector 3D.
        </p>
        <dl class="estilos">
          <dt>Rectangular</dt><dd>${r.cruzRectangular}</dd>
          <dt>Cilíndrica</dt><dd>${r.cruzCilindrica}</dd>
        </dl>
        <p class="nota">${r.cruzInterpretacion}</p>
      </section>
    `;
  }
}
