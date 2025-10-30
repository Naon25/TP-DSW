import React, { useState } from 'react';
import './tablaSocios.css';

import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
} from '@coreui/react';

export function EntityTable({ columns, data, entityName, onDelete, onEdit }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const abrirEliminar = (item) => {
    setSelected(item);
    setModalOpen(true);
  };

  const abrirEditar = (item) => {
    setSelected(item);
    setModalEditOpen(true);
  };

  const confirmarEliminar = () => {
    onDelete(selected.id);
    setModalOpen(false);
  };

  const handleChange = (field, value) => {
    setSelected({ ...selected, [field]: value });
  };

  const guardarCambios = () => {
    // Convertir campos numéricos a números
    const datosActualizados = { ...selected };
    if (datosActualizados.precioMensualBase) {
      datosActualizados.precioMensualBase = Number(datosActualizados.precioMensualBase);
    }
    if (datosActualizados.nroBox) {
      datosActualizados.nroBox = Number(datosActualizados.nroBox);
    }
    if (datosActualizados.longitudMax) {
      datosActualizados.longitudMax = Number(datosActualizados.longitudMax);
    }
    if (datosActualizados.nroPilon) {
      datosActualizados.nroPilon = Number(datosActualizados.nroPilon);
    }
    onEdit(selected.id, datosActualizados);
    setModalEditOpen(false);
  };

  return (
    <div className="table-container">
      <CTable striped hover bordered borderColor="primary" responsive className='c-table-custom'>
        <CTableHead>
          <CTableRow>
            {columns.map((col) => (
              <CTableHeaderCell key={col.key}>{col.label}</CTableHeaderCell>
            ))}
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((item) => (
            <CTableRow key={item.id}>
              {columns.map((col) => (
                <CTableDataCell key={col.key}>{item[col.key]}</CTableDataCell>
              ))}
              <CTableDataCell>
                <CButton
                  color="warning"
                  size="sm"
                  onClick={() => abrirEditar(item)}
                >
                  Editar
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="danger"
                  size="sm"
                  onClick={() => abrirEliminar(item)}
                >
                  Eliminar
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Modal Eliminar */}
      <CModal visible={modalOpen} onClose={() => setModalOpen(false)}>
        <CModalHeader>Confirmar eliminación</CModalHeader>
        <CModalBody>
          ¿Estás seguro de que quieres eliminar este {entityName}?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalOpen(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={confirmarEliminar}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Editar */}
      <CModal visible={modalEditOpen} onClose={() => setModalEditOpen(false)}>
        <CModalHeader>Editar {entityName}</CModalHeader>
        <CModalBody>
          {columns.map((col) => {
            if (col.key === 'estado') {
              return (
                <div key={col.key} className="mb-3">
                  <label className="form-label">{col.label}</label>
                  <select
                    className="form-select"
                    value={selected?.[col.key] || ''}
                    onChange={(e) => handleChange(col.key, e.target.value)}
                  >
                    <option value="">Seleccione un estado</option>
                    {entityName === 'box' ? (
                      <>
                        <option value="disponible">Disponible</option>
                        <option value="ocupado">Ocupado</option>
                        <option value="mantenimiento">Mantenimiento</option>
                      </>
                    ) : (
                      <>
                        <option value="libre">Libre</option>
                        <option value="ocupado">Ocupado</option>
                      </>
                    )}
                  </select>
                </div>
              );
            }
            if (col.key === 'zona') {
              return (
                <div key={col.key} className="mb-3">
                  <label className="form-label">{col.label}</label>
                  <select
                    className="form-select"
                    value={selected?.[col.key] || ''}
                    onChange={(e) => handleChange(col.key, e.target.value)}
                  >
                    <option value="">Seleccione una zona</option>
                    <option value="Norte">Norte</option>
                    <option value="Sur">Sur</option>
                    <option value="Este">Este</option>
                    <option value="Oeste">Oeste</option>
                  </select>
                </div>
              );
            }
            if (col.key === 'precioMensualBase' || col.key === 'nroBox' || col.key === 'longitudMax' || col.key === 'nroPilon') {
              return (
                <div key={col.key} className="mb-3">
                  <label className="form-label">{col.label}</label>
                  <CFormInput
                    type="number"
                    value={selected?.[col.key] || ''}
                    onChange={(e) => handleChange(col.key, Number(e.target.value))}
                  />
                </div>
              );
            }
            return (
              <div key={col.key} className="mb-3">
                <label className="form-label">{col.label}</label>
                <CFormInput
                  value={selected?.[col.key] || ''}
                  onChange={(e) => handleChange(col.key, e.target.value)}
                />
              </div>
            );
          })}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalEditOpen(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={guardarCambios}>
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}
