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
    onEdit(selected.id, selected);
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
          {columns.map((col) => (
            <CFormInput
              key={col.key}
              label={col.label}
              value={selected?.[col.key] || ''}
              onChange={(e) => handleChange(col.key, e.target.value)}
            />
          ))}
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
