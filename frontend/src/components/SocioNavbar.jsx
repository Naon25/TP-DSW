import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavItem,
  CNavLink,
  CNavbarNav,
  CButton,
} from '@coreui/react';

export function SocioNavbar({ onSeleccion }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <CNavbar colorScheme="dark" className="bg-success px-3" expand="lg" fixed="top">
      <CContainer fluid className="d-flex justify-content-between align-items-center">
        {/* Izquierda */}
        <div className="d-flex align-items-center">
          <CNavbarBrand
            onClick={() => onSeleccion(null)}
            style={{ cursor: 'pointer', color: 'white', marginRight: '1rem' }}
          >
            Club Náutico
          </CNavbarBrand>

          <CNavbarNav className="d-flex flex-row">
            <CNavItem>
              <CNavLink
                href="#"
                onClick={() => onSeleccion('embarcaciones')}
                style={{ color: 'white', paddingLeft: 0 }}
              >
                Embarcaciones
              </CNavLink>
            </CNavItem>
          </CNavbarNav>
        </div>

        {/* Derecha */}
        <CButton color="light" variant="outline" onClick={handleLogout}>
          Cerrar sesión
        </CButton>
      </CContainer>
    </CNavbar>
  );
}
