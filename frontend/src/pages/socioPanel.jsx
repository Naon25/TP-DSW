import React, { useState, useEffect } from 'react';
import { SocioNavbar } from '../components/SocioNavbar.jsx';
import SocioHome from '../components/SocioHome.jsx';
import {SocioEmbarcaciones} from '../components/SocioEmbarcaciones.jsx';

export function SocioPanel() {
  const [pagina, setPagina] = useState(null);
  const [socio, setSocio] = useState(null);

console.log('🔍 Render condicional: pagina =', pagina, ', socio =', socio);

useEffect(() => {
  const socioGuardado = localStorage.getItem('socio');
  if (socioGuardado) {
    try {
      const socioObj = JSON.parse(socioGuardado);
      console.log('✅ Socio cargado desde localStorage:', socioObj);
      setSocio(socioObj);
    } catch (e) {
      console.error('❌ Error al parsear socio:', e);
    }
  } else {
    console.warn('⚠️ No hay socio en localStorage');
  }
}, []);

  function handleSeleccion(pagina) {
    setPagina(pagina);
  }

  return (
    <>
        <SocioNavbar onSeleccion={handleSeleccion} paginaActual={pagina} />
        {!pagina && <SocioHome onSeleccion={handleSeleccion} />}
        {pagina === 'embarcaciones' && socio && (
         <SocioEmbarcaciones idSocio={socio.id} />
        )}
    </>
  );
}
