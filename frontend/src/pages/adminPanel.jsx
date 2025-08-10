import React, { useState } from 'react';
import { AdminNavbar } from '../components/AdminNavbar.jsx';
import { CContainer } from '@coreui/react';
import { MenuAdminSocios } from '../components/MenuAdminSocios.jsx';
import AdministrarSocios from './AdministrarSocios.jsx';
import AdminHome from '../components/AdminHome.jsx';

// importá otros componentes cuando los tengas

export function AdminPanel() {
  const [pagina, setPagina] = useState(null);

  function handleSeleccion(pagina) {
    setPagina(pagina);
  }

  return (
    <>
      <AdminNavbar onSeleccion={handleSeleccion} paginaActual={pagina} />
      {!pagina && <AdminHome onSeleccion={handleSeleccion} />}
      <CContainer style={{ marginTop: '70px' }}>
        {pagina === 'socios' && (
          <MenuAdminSocios onSeleccion={handleSeleccion} />
        )}
        {pagina === 'administrarSocios' && <AdministrarSocios />}
        {pagina === 'embarcaciones' && (
          <div>Gestión de embarcaciones (próximamente)</div>
        )}
        {pagina === 'amarras' && <div>Gestión de amarras (próximamente)</div>}
        
      </CContainer>
    </>
  );
}
