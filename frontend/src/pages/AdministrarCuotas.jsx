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

  const marcarComoPagada = async (cuotaId, socioId) => {
    try {
      await actualizarCuota(cuotaId, {
        pagada: true,
        fechaPago: new Date().toISOString(),
      })
      setCuotasPorSocio((prev) => {
        const actualizadas = prev[socioId].map((cuota) =>
          cuota.id === cuotaId ? { ...cuota, pagada: true } : cuota
        )
        return { ...prev, [socioId]: actualizadas }
      })
    } catch (error) {
      console.error(`Error al marcar cuota ${cuotaId} como pagada:`, error)
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
                          <th style={{ width: '30%' }}>Vencimiento</th>
                          <th style={{ width: '30%' }}>Monto</th>
                          <th style={{ width: '40%' }}>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cuotasFiltradas.slice().reverse().map((cuota) => (
                          <tr key={cuota.id}>
                            <td>{new Date(cuota.fechaVencimiento).toLocaleDateString()}</td>
                            <td>${cuota.monto}</td>
                            <td>
                              <div className="d-flex justify-content-between align-items-center">
                                <span className={`fw-bold ${cuota.pagada ? 'text-success' : 'text-danger'}`}>
                                  {cuota.pagada ? '✅ Pagada' : '❌ Impaga'}
                                </span>
                                {!cuota.pagada && (
                                  <CButton
                                    size="sm"
                                    style={{
                                      backgroundColor: '#81c784',
                                      color: '#1b5e20',
                                      border: '1px solid #66bb6a',
                                    }}
                                    onClick={() => marcarComoPagada(cuota.id, item.id)}
                                  >
                                    Marcar
                                  </CButton>
                                )}
                              </div>
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
    </CCard>
  )
}
