import React from 'react';
import { CListGroup, CListGroupItem, CButton, CBadge } from '@coreui/react';

export default function ListaEmbarcacionesClub({ embarcaciones = [], selectedId, onSelect }) {
  return (
    <div style={{ maxHeight: 600, overflowY: 'auto' }}>
      <CListGroup flush>
        {embarcaciones.map((e) => (
          <CListGroupItem
            key={e.id}
            className="d-flex justify-content-between align-items-center"
            style={{
              borderLeft: selectedId === e.id ? '4px solid var(--cui-primary)' : undefined,
              padding: '10px 12px',
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div style={{ width: 56, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                ⛵
              </div>
              <div>
                <div className="fw-semibold">{e.nombre}</div>
                <div className="text-muted small">
                  {(e.tipoEmbarcacion?.nombre ?? e.tipo) || '—'} • {e.eslora ? `${e.eslora}mts` : '—'}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <CButton size="sm" color={selectedId === e.id ? 'primary' : 'outline'}  onClick={() => onSelect && onSelect(e.id)} style={{ marginLeft: '15px' }}>
                {selectedId === e.id ? 'Seleccionada' : 'Seleccionar'}
              </CButton>
            </div>
          </CListGroupItem>
        ))}
        {embarcaciones.length === 0 && <div className="text-muted p-3">No hay embarcaciones</div>}
      </CListGroup>
    </div>
  );
}