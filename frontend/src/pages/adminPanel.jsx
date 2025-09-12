import React, { useState } from 'react';
import { AdminNavbar } from '../components/AdminNavbar.jsx';
import { CContainer } from '@coreui/react';
import { MenuAdminSocios } from '../components/MenuAdminSocios.jsx';
import { MenuAdminAmarras } from '../components/MenuAdminAmarras.jsx';
import AdministrarSocios from './AdministrarSocios.jsx';
import AdministrarAmarras from './AdministrarAmarras.jsx';
import AdminHome from '../components/AdminHome.jsx';
import { AdministrarCuotas } from './AdministrarCuotas.jsx'
import { AdministrarAfiliaciones} from './AdministrarAfiliaciones.jsx'

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
        {pagina === 'administrarCuotas' && <AdministrarCuotas/>}
        {pagina === 'administrarAfiliaciones' && <AdministrarAfiliaciones/>}
        {pagina === 'embarcaciones' && (
          <div>Gestión de embarcaciones (próximamente)</div>
        )}
        {pagina === 'amarras' && <MenuAdminAmarras onSeleccion={handleSeleccion}/>}
        {pagina === 'administrarAmarras' && <AdministrarAmarras/>}
      </CContainer>
    </>
  );
}
