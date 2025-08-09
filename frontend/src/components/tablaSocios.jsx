import React from 'react';
import './tablaSocios.css'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react';

/*id nombre dni email telefono*/
export function TablaSocios({ users }) {
  return (
    <div className="table-container">
      <CTable
        striped
        hover
        bordered
        borderColor="primary"
        responsive
        className="c-table-custom"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Nombre</CTableHeaderCell>
            <CTableHeaderCell>DNI</CTableHeaderCell>
            <CTableHeaderCell>E-Mail</CTableHeaderCell>
            <CTableHeaderCell>Telefono</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map(({ id, nombre, dni, email, telefono }) => (
            <CTableRow key={id}>
              <CTableDataCell>{id}</CTableDataCell>
              <CTableDataCell>{nombre}</CTableDataCell>
              <CTableDataCell>{dni}</CTableDataCell>
              <CTableDataCell>{email}</CTableDataCell>
              <CTableDataCell>{telefono}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
}
