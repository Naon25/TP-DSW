
import React from 'react';
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CButton,
} from '@coreui/react';

export function AdminNavbar({ onSeleccion, paginaActual }) {
  return (
    <CNavbar colorScheme="dark" className="bg-primary" expand="lg" fixed="top">
      <CContainer fluid>
        <CNavbarBrand onClick={() => onSeleccion(null)} style={{cursor: 'pointer'}}>Club Náutico Admin</CNavbarBrand>
        <CNavbarNav className="me-auto">
          <CNavItem>
            <CNavLink
              active={paginaActual === 'socios'}
              href="#"
              onClick={() => onSeleccion('socios')}
            >
              Socios
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={paginaActual === 'embarcaciones'}
              href="#"
              onClick={() => onSeleccion('embarcaciones')}
            >
              Embarcaciones
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={paginaActual === 'amarras'}
              href="#"
              onClick={() => onSeleccion('amarras')}
            >
              Amarras
            </CNavLink>
          </CNavItem>
        </CNavbarNav>
      </CContainer>
    </CNavbar>
  );
}
