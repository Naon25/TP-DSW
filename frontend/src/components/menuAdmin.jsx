import React from 'react';


export function MenuAdmin({ onSeleccion }) {
  return (
    <nav className = 'menu-admin'>
      <h2>Menú Administrador</h2>
      <ul>
        <li>
          <button onClick={() => onSeleccion('socios')}>
            Gestionar Socios
          </button>
        </li>
        <li>
          <button onClick={() => onSeleccion('embarcaciones')}>
            Gestionar Embarcaciones
          </button>
        </li>
        <li>
          <button onClick={() => onSeleccion('amarras')}>
            Gestionar Amarras
          </button>
        </li>
        {/* Agregá más opciones aquí */}
      </ul>
    </nav>
  );
}
