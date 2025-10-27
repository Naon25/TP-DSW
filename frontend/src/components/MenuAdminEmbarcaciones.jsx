import { MenuButton } from './menuButton';
import { MenuPadre } from './menuPadre.jsx';

export function MenuAdminEmbarcaciones({ onSeleccion }) {
  return (
    <MenuPadre label="Menú de administración de Embarcaciones">
      <MenuButton
        label="Ingresar Embarcaciones"
        onClick={() => onSeleccion('embarcacionesDeSocios')}
      />
        <MenuButton
        label="Tipos de Embarcación"
        onClick={() => onSeleccion('tiposEmbarcacion')}
      />
    </MenuPadre>
  );
}