import React, { useState } from 'react';
import { MenuAdmin } from './menuAdmin.jsx';
import Socios from '../pages/socios.jsx';



// importá otros componentes cuando los tengas

export function AdminPanel() {
  const [pagina, setPagina] = useState(null);

  function handleSeleccion(pagina) {
    setPagina(pagina);
  }

  return (
    <div className = 'admin-panel'>
      <MenuAdmin onSeleccion={handleSeleccion} />
      <main>
        {pagina === 'socios' && <Socios />}
        {pagina === 'embarcaciones' && (
          <div>Gestión de embarcaciones (próximamente)</div>
        )}
        {pagina === 'amarras' && <div>Gestión de amarras (próximamente)</div>}
        {!pagina && <p>Por favor, selecciona una funcionalidad.</p>}
      </main>
    </div>
  );
}
