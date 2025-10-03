import { useEffect, useState } from 'react';
import { getSocios, crearSocio, eliminarSocio, actualizarSocio } from '../api/socios.js';
import { TablaSocios } from '../components/tablaSocios.jsx';
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
import { crearAfiliacion } from '../api/afiliaciones.js';

export default function AdministrarSocios() {
  const [socios, setSocios] = useState([]);
  const [nombre, setNombre] = useState('');
  const[apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const [tipoAfiliacion, setTipoAfiliacion] = useState('');

  useEffect(() => {
    cargarSocios();
  }, []);

  const cargarSocios = async () =>{
    const res = await getSocios();
    setSocios(res.data.data);
  };

const handleCrear = async (e) => {
  e.preventDefault();

  if (!tipoAfiliacion.trim()) {
    alert('Debés seleccionar un tipo de afiliación válido.');
    return;
  }

  const socioResp = await crearSocio({ nombre, apellido, dni, telefono, email });
  const socioId = socioResp.data.data.id;

  await crearAfiliacion({
    fechaInicio: new Date(),
    tipo: tipoAfiliacion,
    socio: socioId,
  });

  await cargarSocios();
  setNombre('');
  setApellido('');
  setDni('');
  setTelefono('');
  setEmail('');
  setTipoAfiliacion('');
};


  const handleEliminar = async (id) => {
    try {
      await eliminarSocio(id); 
      cargarSocios();
    } catch (error) {
      console.error('Error al eliminar socio', error);
      const message = error.response?.data?.message || '';

      if (message.includes('foreign key') || message.includes('Cannot delete or update a parent row')) {
        alert('No se puede eliminar este socio porque tiene embarcaciones asociadas.');
      } else {
        alert('Ocurrió un error al eliminar el socio.');
      }
  };
  }
  const handleEditar = async (id, socioEditar) => {
    try {
      await actualizarSocio(id, socioEditar);
      cargarSocios();
    } catch (error) {
      alert('Error al actualizar socio', error);
    }
  };

  return (
    <div className="p-4">
      <CCard>
        <CCardHeader>
          <h4>Crear Socios</h4>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleCrear}>
            <CRow className="mb-3">
              <CCol md={3}>
                <CFormInput
                  label="Nombre"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="Apellido"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="DNI"
                  placeholder="Ingrese DNI sin puntos o espacios"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="Teléfono"
                  placeholder="Ingrese teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="Email"
                  type="email"
                  placeholder="Ingrese un email válido"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </CCol>
              <CCol md={3}>
                <label className="form-label">Tipo de Afiliación</label>
                <select
                  className="form-select"
                  value={tipoAfiliacion}
                  onChange={(e) => setTipoAfiliacion(e.target.value)}
                  required
                >
                  <option value="" disabled>Seleccione un tipo</option>
                  <option value="Básica">Básica</option>
                </select>
              </CCol>
            </CRow>
            <CButton color="primary" type="submit">
              Crear Socio
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      <div className="mt-4">
        <EntityTable
          entityName="socio"
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'nombre', label: 'Nombre' },
            { key: 'apellido', label: 'Apellido' },
            { key: 'dni', label: 'DNI' },
            { key: 'email', label: 'E-Mail' },
            { key: 'telefono', label: 'Teléfono' },
          ]}
          data={socios}
          onDelete={handleEliminar}
          onEdit={handleEditar}
        />
      </div>
    </div>
  );
}
