import { useEffect, useState } from 'react';
import { getBoxes } from '../api/boxes.js';
import { EntityTable } from '../components/TablaGenerica.jsx';

export default function ListarBoxes() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    cargarBoxes();
  }, []);

  const cargarBoxes = async () => {
    const res = await getBoxes();
    setBoxes(res.data.data);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Listado de Boxes</h2>
      {boxes == null ? (
        <div className="text-center p-4 border rounded">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando boxes...</p>
        </div>
      ) : !Array.isArray(boxes) ? (
        <div className="alert alert-warning">
          <strong>Error:</strong> Los datos no son un array válido.
          <br />
          <small>Tipo recibido: {typeof boxes}</small>
        </div>
      ) : boxes.length === 0 ? (
        <div className="text-center p-4 border rounded">
          <h5>No hay boxes registrados</h5>
          <p className="text-muted">
            No se encontraron boxes en el sistema.
          </p>
        </div>
      ) : (
        <EntityTable
          entityName="box"
          entityNamePlural="boxes"
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'nroBox', label: 'Número de Box' },
            { key: 'estado', label: 'Estado' },
            { key: 'precioMensualBase', label: 'Precio Mensual' }
          ]}
          data={boxes}
          readOnly={true}
          className="tabla-boxes"
        />
      )}
    </div>
  );
}