import React from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { MenuButton } from './menuButton';
import { MenuPadre } from './menuPadre.jsx';

export function MenuAdminSocios({ onSeleccion }) {
  return (
    <MenuPadre label="Menú de administración de Socios">
      <MenuButton
        label="Administrar Socios"
        onClick={() => onSeleccion('administrarSocios')}
      />
      <MenuButton
        label="Afiliaciones"
        onClick={() => onSeleccion('administrarAfiliaciones')}
      />
      <MenuButton
        label="Cuotas y pagos"
        onClick={() => onSeleccion('administrarCuotas')}
      />
    </MenuPadre>
  );
}