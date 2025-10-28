import { MenuButton } from './menuButton';
import { MenuPadre } from './menuPadre.jsx';

export function MenuAdminBox({onSeleccion}){
  return (
    <MenuPadre label = 'Menú de administración de Boxes'>
      <MenuButton label = 'Administrar Boxes' onClick={() => onSeleccion('administrarBoxes')} />
      <MenuButton label = 'Listar Boxes' onClick={() => onSeleccion('listarBoxes')} />
    </MenuPadre>
  );
}