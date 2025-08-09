import React from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { MenuButton } from './menuButton';
import { MenuPadre } from './menuPadre.jsx';

export function MenuAdminSocios({ onSeleccion }) {
  return (
    <MenuPadre label="Menú de administración de Socios">
      <MenuButton
        label="Crear Socios"
        onClick={() => onSeleccion('crearSocios')}
      />
      <MenuButton
        label="Editar Socios"
        onClick={() => onSeleccion('embarcaciones')}
      />
      <MenuButton
        label="Eliminar Socios"
        onClick={() => onSeleccion('amarras')}
      />
    </MenuPadre>
  );
}