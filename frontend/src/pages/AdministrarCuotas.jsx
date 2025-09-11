import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCollapse,
  CSmartTable,
  CCard,
  CSpinner,
} from '@coreui/react-pro'
import { getSocios } from '../api/socios.js'
import { getCuotas, actualizarCuota } from '../api/cuotas.js'

export const AdministrarCuotas = () => {
  const [details, setDetails] = useState([])
  const [socios, setSocios] = useState([])
  const [cuotasPorSocio, setCuotasPorSocio] = useState({})
  const [loadingCuotas, setLoadingCuotas] = useState({})
  const [mostrarSoloImpagas, setMostrarSoloImpagas] = useState({})
  const [errorSocios, setErrorSocios] = useState(false)
  const [loadingSocios, setLoadingSocios] = useState(true)

  const [cuotaEditando, setCuotaEditando] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [formPago, setFormPago] = useState({ pagada: false, fechaPago: '' })

  useEffect(() => {
    const fetchSocios = async () => {
      try {
        const resp = await getSocios()
        const arr = resp?.data?.data ?? resp?.data
        if (Array.isArray(arr)) {
          const filtrados = arr.filter((s) => s.id && s.nombre && s.apellido)
          setSocios(filtrados)
        } else {
          setErrorSocios(true)
        }
      } catch (error) {
        console.error('Error al cargar socios:', error)
        setErrorSocios(true)
      } finally {
        setLoadingSocios(false)
      }
    }

    fetchSocios()
  }, [])

  const toggleDetails = async (id) => {
    const isOpen = details.includes(id)
    const newDetails = isOpen ? details.filter((i) => i !== id) : [...details, id]
    setDetails(newDetails)

    if (!cuotasPorSocio[id] && !isOpen) {
      setLoadingCuotas((prev) => ({ ...prev, [id]: true }))
      try {
        const resp = await getCuotas()
        const todas = resp?.data?.data ?? []
        const cuotasDelSocio = todas.filter((c) => c.socio?.id === id)
        setCuotasPorSocio((prev) => ({ ...prev, [id]: cuotasDelSocio }))
      } catch (error) {
        console.error(`Error al obtener cuotas para socio ${id}:`, error)
        setCuotasPorSocio((prev) => ({ ...prev, [id]: [] }))
      } finally {
        setLoadingCuotas((prev) => ({ ...prev, [id]: false }))
      }
    }
  }

  const abrirModalEdicion = (cuota, socioId) => {
    setCuotaEditando({ ...cuota, socioId })
    setFormPago({
      pagada: cuota.pagada,
      fechaPago: cuota.fechaPago ? cuota.fechaPago.slice(0, 10) : '',
    })
    setModalVisible(true)
  }

  const guardarEdicionCuota = async () => {
    try {
      await actualizarCuota(cuotaEditando.id, {
        pagada: formPago.pagada,
        fechaPago: formPago.pagada ? new Date(formPago.fechaPago).toISOString() : null,
      })

      setCuotasPorSocio((prev) => {
        const actualizadas = prev[cuotaEditando.socioId].map((cuota) =>
          cuota.id === cuotaEditando.id
            ? { ...cuota, pagada: formPago.pagada, fechaPago: formPago.fechaPago }
            : cuota
        )
        return { ...prev, [cuotaEditando.socioId]: actualizadas }
      })

      setModalVisible(false)
      setCuotaEditando(null)
    } catch (error) {
      console.error('Error al actualizar cuota:', error)
    }
  }

  const toggleFiltroImpagas = (id) => {
    setMostrarSoloImpagas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const columns = [
    { key: 'id', label: 'ID', _style: { width: '10%' }, sorter: true },
    {
      key: 'nombreCompleto',
      label: 'Nombre completo',
      _style: { width: '80%' },
      sorter: true,
      filter: false,
    },
    { key: 'show_details', label: '', _style: { width: '1%' }, filter: false, sorter: false },
  ]

  if (errorSocios) {
    return (
      <CCard className="rounded shadow-sm p-3 mx-auto" style={{ maxWidth: '800px' }}>
        <p className="text-danger">No se pudieron cargar los socios. Verificá la API o la estructura de datos.</p>
      </CCard>
    )
  }

  if (loadingSocios) {
    return (
      <CCard className="rounded shadow-sm p-3 mx-auto text-center" style={{ maxWidth: '800px' }}>
        <CSpinner color="primary" />
        <p className="mt-2">Cargando socios...</p>
      </CCard>
    )
  }

  const sociosConNombreCompleto = socios.map((s) => ({
    ...s,
    nombreCompleto: `${s.nombre} ${s.apellido}`,
  }))

  return (
    <CCard className="rounded shadow-sm p-3 mx-auto" style={{ maxWidth: '800px' }}>
      <CSmartTable
        columns={columns}
        items={sociosConNombreCompleto}
        itemsPerPage={5}
        pagination
        tableFilter
        sorter
        scopedColumns={{
          nombreCompleto: (item) => <td>{item.nombreCompleto}</td>,
          show_details: (item) => (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => toggleDetails(item.id)}
              >
                {details.includes(item.id) ? 'Ocultar' : 'Ver'}
              </CButton>
            </td>
          ),
          details: (item) => {
            const cuotas = cuotasPorSocio[item.id] || []
            const loading = loadingCuotas[item.id]
            const soloImpagas = mostrarSoloImpagas[item.id]
            const cuotasFiltradas = soloImpagas
              ? cuotas.filter((c) => !c.pagada)
              : cuotas

            return (
              <CCollapse visible={details.includes(item.id)}>
                <div className="p-2 border-start border-primary">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Cuotas mensuales de {item.nombreCompleto}</h6>
                    <CButton
                      color="secondary"
                      size="sm"
                      variant="outline"
                      onClick={() => toggleFiltroImpagas(item.id)}
                    >
                      {soloImpagas ? 'Mostrar todas' : 'Mostrar solo impagas'}
                    </CButton>
                  </div>
                  {loading ? (
                    <CSpinner size="sm" color="primary" />
                  ) : cuotasFiltradas.length === 0 ? (
                    <p className="text-muted">No hay cuotas para mostrar.</p>
                  ) : (
                    <table className="table table-sm table-bordered align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th style={{ width: '25%' }}>Vencimiento</th>
                          <th style={{ width: '25%' }}>Monto</th>
                          <th style={{ width: '25%' }}>Estado</th>
                          <th style={{ width: '25%' }}>Fecha de pago</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cuotasFiltradas.slice().reverse().map((cuota) => (
                          <tr key={cuota.id}>
                            <td>{new Date(cuota.fechaVencimiento).toLocaleDateString()}</td>
                            <td>${cuota.monto}</td>
                            <td>
                              <span className={`fw-bold ${cuota.pagada ? 'text-success' : 'text-danger'}`}>
                                {cuota.pagada ? '✅ Pagada' : '❌ Impaga'}
                              </span>
                            </td>
                            <td>
                              {cuota.pagada && cuota.fechaPago
                                ? new Date(cuota.fechaPago).toLocaleDateString()
                                : '-'}
                              <CButton
                                size="sm"
                                className="ms-2"
                                style={{
                                  backgroundColor: '#fff176',
                                  color: '#f57f17',
                                  border: '1px solid #fbc02d',
                                }}
                                onClick={() => abrirModalEdicion(cuota, item.id)}
                              >
                                Editar
                              </CButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </CCollapse>
            )
          },
        }}
        tableProps={{
          responsive: true,
          striped: true,
          hover: true,
          className: 'table-sm',
        }}
        tableBodyProps={{
          className: 'align-middle',
        }}
      />
      {modalVisible && (
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1050,
        }}
      >
        <div className="modal d-block h-100 d-flex align-items-center justify-content-center">
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(0,0,0,0.3)',
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title">Editar cuota</h5>
                <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">¿Está pagada?</label>
                  <select
                    className="form-select"
                    value={formPago.pagada ? 'sí' : 'no'}
                    onChange={(e) =>
                      setFormPago((prev) => ({
                        ...prev,
                        pagada: e.target.value === 'sí',
                      }))
                    }
                  >
                    <option value="no">No</option>
                    <option value="sí">Sí</option>
                  </select>
                </div>
                {formPago.pagada && (
                  <div className="mb-3">
                    <label className="form-label">Fecha de pago</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formPago.fechaPago}
                      onChange={(e) =>
                        setFormPago((prev) => ({
                          ...prev,
                          fechaPago: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <CButton color="secondary" onClick={() => setModalVisible(false)}>
                  Cancelar
                </CButton>
                <CButton color="primary" onClick={guardarEdicionCuota}>
                  Guardar
                </CButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    </CCard>
  )
}
