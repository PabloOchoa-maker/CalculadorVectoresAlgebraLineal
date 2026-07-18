import './styles/main.css';

import { Calculadora2DView } from './views/calculadora2d.view';
import { Calculadora3DView } from './views/calculadora3d.view';
import { Calculadora2DController } from './controllers/calculadora2d.controller';
import { Calculadora3DController } from './controllers/calculadora3d.controller';
import { Conversiones2DService } from './services/conversiones2d.service';
import { Conversiones3DService } from './services/conversiones3d.service';
import { Operaciones2DService } from './services/operaciones2d.service';
import { Operaciones3DService } from './services/operaciones3d.service';
import { FormatoService } from './services/formato.service';

/**
 * Arranque de la app: crea los servicios, las vistas y los controllers.
 * Es el equivalente de Principal.java, pero solo cablea; no tiene lógica.
 */
function iniciar(): void {
  const panel2d = document.querySelector<HTMLElement>('#panel-2d');
  const panel3d = document.querySelector<HTMLElement>('#panel-3d');
  if (!panel2d || !panel3d) {
    throw new Error('Faltan los paneles en el HTML');
  }

  // Servicios: sin estado, se comparten entre controllers.
  const formato = new FormatoService();
  const conv2d = new Conversiones2DService();
  const conv3d = new Conversiones3DService();

  new Calculadora2DController(
    new Calculadora2DView(panel2d),
    conv2d,
    new Operaciones2DService(),
    formato
  );

  new Calculadora3DController(
    new Calculadora3DView(panel3d),
    conv3d,
    new Operaciones3DService(),
    formato
  );

  configurarPestanas();
}

/** Navegación entre 2D y 3D. Sustituye al menú de consola de Menu.java. */
function configurarPestanas(): void {
  const pestanas = document.querySelectorAll<HTMLButtonElement>('.pestana');

  for (const pestana of pestanas) {
    pestana.addEventListener('click', () => {
      for (const otra of pestanas) {
        const activa = otra === pestana;
        otra.classList.toggle('pestana--activa', activa);
        otra.setAttribute('aria-selected', String(activa));

        const panel = document.querySelector<HTMLElement>(`#${otra.dataset.panel}`);
        if (panel) {
          panel.classList.toggle('panel--oculto', !activa);
          panel.hidden = !activa;
        }
      }
    });
  }
}

iniciar();
