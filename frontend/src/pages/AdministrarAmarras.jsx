import { useEffect, useState } from 'react';
import { getAmarras } from '../api/amarras.js';
import { crearAmarra, eliminarAmarra, actualizarAmarra } from '../api/amarras.js';
import { EntityTable } from '../components/TablaGenerica.jsx';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CButton,
} from '@coreui/react';

export default function AdministrarAmarras(){

  const [amarras, setAmarras] = useState([]);
  const [estado, setEstado] = useState('');
  const [precioMensualBase, setPrecioMensualBase] = useState('');
  const [longitudMax, setLongitudMax] = useState('');
  const [zona, setZona] = useState('');
  const [nroPilon, setNroPilon] = useState('');

  useEffect(() => {
    cargarAmarras();
  }, []);


  const cargarAmarras = async () => {
    const res = await getAmarras();
    setAmarras(res.data.data);
  };

  const handleCrear = async (e) => {
      e.preventDefault();
      await crearAmarra({ estado, precioMensualBase, longitudMax, zona, nroPilon });
      await cargarAmarras();
      setEstado('');
      setPrecioMensualBase('');
      setLongitudMax('');
      setZona('');
      setNroPilon('');
    };

    const handleEliminar = async (id) => {
      try {
        // Aquí deberías llamar a tu API para eliminar
        await eliminarAmarra(id);
        console.log('Eliminar amarra con ID:', id);
        cargarAmarras(); // Recargar después de eliminar
      } catch (error) {
        console.error('Error al eliminar amarra:', error);
      }
    };
    const handleEditar = async (id, datosActualizados) => {
      try {
        // Aquí deberías llamar a tu API para editar
        await actualizarAmarra(id, datosActualizados);
        console.log('Editar amarra ID:', id, 'con datos:', datosActualizados);
        cargarAmarras(); // Recargar después de editar
      } catch (error) {
        console.error('Error al editar amarra:', error);
      }
    };

  return (
    <div className="p-4">
      <CCard>
        <CCardHeader>
          <h4>Crear Amarras</h4>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleCrear}>
            <CRow className="mb-3">
              <CCol md={3}>
                <CFormInput
                  label="Estado"
                  placeholder="Estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="Precio Mensual"
                  placeholder="Precio Mensual"
                  value={precioMensualBase}
                  onChange={(e) => setPrecioMensualBase(Number(e.target.value))}
                  required
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="Longitud Maxima"
                  placeholder="Ingrese la longitud maxima en metros"
                  value={longitudMax}
                  onChange={(e) => setLongitudMax(Number(e.target.value))}
                  required
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="Zona"
                  placeholder="Ingrese la zona(Norte / Sur)"
                  value={zona}
                  onChange={(e) => setZona(e.target.value)}
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="Nro Pilon"
                  placeholder="Ingrese el nro del Pilon"
                  value={nroPilon}
                  onChange={(e) => setNroPilon(Number(e.target.value))}
                />
              </CCol>
            </CRow>
            <CButton color="primary" type="submit">
              Crear Amarra
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
      <div className="mt-4">
        {amarras == null ? (
          <div className="text-center p-4 border rounded">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando amarras...</p>
          </div>
        ) : !Array.isArray(amarras) ? (
          <div className="alert alert-warning">
            <strong>Error:</strong> Los datos no son un array válido.
            <br />
            <small>Tipo recibido: {typeof amarras}</small>
          </div>
        ) : amarras.length === 0 ? (
          <div className="text-center p-4 border rounded">
            <h5> No hay amarras registradas</h5>
            <p className="text-muted">
              Crea la primera amarra usando el formulario de arriba.
            </p>
          </div>
        ) : (
          <>
            {console.log('datos acuales', amarras)}
            <EntityTable
              entityName="amarra"
              entityNamePlural="amarras"
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'estado', label: 'Estado' },
                { key: 'precioMensualBase', label: 'Precio Mensual' },
                { key: 'longitudMax', label: 'Longitud Maxima' },
                { key: 'zona', label: 'Zona' },
                { key: 'nroPilon', label: 'Nro Pilon' },
              ]}
              data={amarras}
              onDelete={handleEliminar}
              onEdit={handleEditar}
              className="tabla-amarras"
            />
            
          </>
        )}
        
      </div>
    </div>
  );



}