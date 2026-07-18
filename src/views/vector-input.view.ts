/**
 * Campo de entrada de un vector: un selector de sistema + N inputs numéricos
 * cuyas etiquetas cambian según el sistema elegido.
 *
 * Es la pieza reutilizable entre 2D y 3D: se configura con la lista de
 * sistemas y las etiquetas de cada uno.
 */
export interface ConfigSistema {
  /** Valor interno, p. ej. 'polar'. */
  valor: string;
  /** Texto del <option>, p. ej. 'Polar'. */
  etiqueta: string;
  /** Etiquetas de cada input para este sistema, p. ej. ['r', 'θ (°)']. */
  campos: string[];
}

export class VectorInputView {
  private readonly select: HTMLSelectElement;
  private readonly inputs: HTMLInputElement[] = [];
  private readonly etiquetas: HTMLLabelElement[] = [];

  constructor(
    contenedor: HTMLElement,
    nombre: string,
    private readonly sistemas: ConfigSistema[],
    private readonly numCampos: number
  ) {
    const id = `vec-${nombre.toLowerCase()}-${Math.random().toString(36).slice(2, 8)}`;

    const fieldset = document.createElement('fieldset');
    fieldset.className = 'vector-input';

    const legend = document.createElement('legend');
    legend.textContent = `Vector ${nombre}`;
    fieldset.appendChild(legend);

    // Selector de sistema
    const filaSistema = document.createElement('div');
    filaSistema.className = 'campo campo--sistema';

    const labelSistema = document.createElement('label');
    labelSistema.textContent = 'Sistema';
    labelSistema.htmlFor = `${id}-sistema`;

    this.select = document.createElement('select');
    this.select.id = `${id}-sistema`;
    for (const s of sistemas) {
      const opt = document.createElement('option');
      opt.value = s.valor;
      opt.textContent = s.etiqueta;
      this.select.appendChild(opt);
    }

    filaSistema.append(labelSistema, this.select);
    fieldset.appendChild(filaSistema);

    // Inputs numéricos
    const filaCampos = document.createElement('div');
    filaCampos.className = 'campos';

    for (let i = 0; i < numCampos; i++) {
      const campo = document.createElement('div');
      campo.className = 'campo';

      const label = document.createElement('label');
      label.htmlFor = `${id}-c${i}`;

      const input = document.createElement('input');
      input.type = 'number';
      input.step = 'any';
      input.id = `${id}-c${i}`;
      input.value = '0';

      campo.append(label, input);
      filaCampos.appendChild(campo);
      this.etiquetas.push(label);
      this.inputs.push(input);
    }

    fieldset.appendChild(filaCampos);
    contenedor.appendChild(fieldset);

    this.select.addEventListener('change', () => this.actualizarEtiquetas());
    this.actualizarEtiquetas();
  }

  /** Repinta las etiquetas para que reflejen el sistema seleccionado. */
  private actualizarEtiquetas(): void {
    const sistema = this.sistemas.find((s) => s.valor === this.select.value);
    if (!sistema) return;
    for (let i = 0; i < this.numCampos; i++) {
      this.etiquetas[i].textContent = sistema.campos[i] ?? '';
    }
  }

  get sistema(): string {
    return this.select.value;
  }

  /** Valores crudos. Un input vacío cuenta como 0. */
  get valores(): number[] {
    return this.inputs.map((i) => {
      const n = parseFloat(i.value);
      return Number.isFinite(n) ? n : 0;
    });
  }

  onCambio(cb: () => void): void {
    this.select.addEventListener('change', cb);
    for (const input of this.inputs) {
      input.addEventListener('input', cb);
    }
  }
}
