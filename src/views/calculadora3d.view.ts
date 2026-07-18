import { VectorInputView, type ConfigSistema } from './vector-input.view';
import type { Entrada3D, Sistema3D } from '../models/coordenadas';
import type { Resultado3D } from '../models/resultado';

const SISTEMAS_3D: ConfigSistema[] = [
  { valor: 'rectangular', etiqueta: 'Rectangular', campos: ['x', 'y', 'z'] },
  { valor: 'cilindrica', etiqueta: 'Cilíndrica', campos: ['r', 'θ (°)', 'z'] }
];

export class Calculadora3DView {
  private readonly vectorA: VectorInputView;
  private readonly vectorB: VectorInputView;
  private readonly salida: HTMLElement;

  constructor(contenedor: HTMLElement) {
    const entradas = document.createElement('div');
    entradas.className = 'entradas';
    contenedor.appendChild(entradas);

    this.vectorA = new VectorInputView(entradas, 'A', SISTEMAS_3D, 3);
    this.vectorB = new VectorInputView(entradas, 'B', SISTEMAS_3D, 3);

    this.salida = document.createElement('div');
    this.salida.className = 'salida';
    contenedor.appendChild(this.salida);
  }

  leerEntradas(): { a: Entrada3D; b: Entrada3D } {
    const [ax, ay, az] = this.vectorA.valores;
    const [bx, by, bz] = this.vectorB.valores;
    return {
      a: { sistema: this.vectorA.sistema as Sistema3D, a: ax, b: ay, c: az },
      b: { sistema: this.vectorB.sistema as Sistema3D, a: bx, b: by, c: bz }
    };
  }

  onCambio(cb: () => void): void {
    this.vectorA.onCambio(cb);
    this.vectorB.onCambio(cb);
  }

  mostrar(r: Resultado3D): void {
    this.salida.innerHTML = `
      <section class="bloque">
        <h3>Vectores ingresados, en todos sus estilos</h3>
        <table class="tabla-estilos">
          <thead>
            <tr><th></th><th>Rectangular</th><th>Cilíndrica</th></tr>
          </thead>
          <tbody>
            ${r.entradas
              .map(
                (v) => `<tr>
                  <th>${v.nombre}</th>
                  <td>${v.rectangular}</td>
                  <td>${v.cilindrica}</td>
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
        <dl class="estilos">
          <dt>Rectangular</dt><dd>${r.cruzRectangular}</dd>
          <dt>Cilíndrica</dt><dd>${r.cruzCilindrica}</dd>
        </dl>
        <p class="nota">A × B es perpendicular tanto a A como a B.</p>
      </section>
    `;
  }
}
