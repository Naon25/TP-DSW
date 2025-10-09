import { useEffect, useState } from 'react';
import { getCuotasPorSocio } from '../api/cuotas';
import './socioHome.css';

export function SocioCuotas({ idSocio }) {
  const [cuotas, setCuotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idSocio) return;

    getCuotasPorSocio(idSocio)
      .then(res => {
        const data = res.data?.data;
        if (!Array.isArray(data)) throw new Error('Formato inesperado');
        setCuotas(data);
      })
      .catch(err => {
        console.error('❌ Error al cargar cuotas:', err);
        setError('Error al cargar cuotas');
      })
      .finally(() => setLoading(false));
  }, [idSocio]);

  return (
    <div className="socio-container">
      <h2 className="socio-title">Mis cuotas</h2>
      <p className="socio-subtitle">Historial de pagos mensuales</p>

      {loading && <p>Cargando cuotas...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && cuotas.length === 0 && <p>No tenés cuotas registradas.</p>}

      <div className="row">
        {cuotas.slice().reverse().map((cuota) => (
          <div key={cuota.id} className="col-md-6 mb-4">
            <div className="card socio-card shadow-sm p-3">
              <h5 className="mb-2">Mes: {new Date(cuota.fechaVencimiento).toLocaleDateString()}</h5>
              <p className="mb-1"><strong>Monto:</strong> ${cuota.monto}</p>
              <p className="mb-1">
                <strong>Estado:</strong>{' '}
                {cuota.pagada ? (
                  <span style={{ color: 'green' }}>Pagada</span>
                ) : (
                  <span style={{ color: 'red' }}>Pendiente</span>
                )}
              </p>
              {cuota.fechaPago && (
                <p className="mb-0"><strong>Fecha de pago:</strong> {new Date(cuota.fechaPago).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
