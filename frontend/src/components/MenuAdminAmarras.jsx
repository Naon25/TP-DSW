import { MenuButton } from './menuButton';
import { MenuPadre } from './menuPadre.jsx';

export function MenuAdminAmarras({onSeleccion}){
  return (
    <MenuPadre label = 'Menú de administración de Amarras'>
      <MenuButton label = 'Administrar Amarras' onClick={() => onSeleccion('administrarAmarras')} />
      <MenuButton label = 'Reservas de Amarras'></MenuButton>
      <MenuButton label = 'Listar Amarras'></MenuButton>
    </MenuPadre>
  );

}