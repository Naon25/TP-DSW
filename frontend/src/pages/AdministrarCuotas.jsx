import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCollapse,
  CSmartTable,
  CCard,
  CSpinner,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
} from '@coreui/react-pro'
import { getSocios } from '../api/socios.js'
import { getCuotas, actualizarCuota, crearCuota } from '../api/cuotas.js'
import { getAfiliaciones } from '../api/afiliaciones.js'

export const AdministrarCuotas = () => {
  const [details, setDetails] = useState([])
  const [socios, setSocios] = useState([])
  const [cuotasPorSocio, setCuotasPorSocio] = useState({})
  const [afiliacionesPorSocio, setAfiliacionesPorSocio] = useState({})
  const [loadingCuotas, setLoadingCuotas] = useState({})
  const [mostrarSoloImpagas, setMostrarSoloImpagas] = useState({})
  const [errorSocios, setErrorSocios] = useState(false)
  const [loadingSocios, setLoadingSocios] = useState(true)

  const [cuotaEditando, setCuotaEditando] = useState(null)
  const [modalEditarVisible, setModalEditarVisible] = useState(false)
  const [formPago, setFormPago] = useState({ pagada: false, fechaPago: '' })

  const [modalNuevaVisible, setModalNuevaVisible] = useState(false)
  const [formNuevaCuota, setFormNuevaCuota] = useState({ monto: '' })
  const [socioSeleccionado, setSocioSeleccionado] = useState(null)

  useEffect(() => {
    const fetchSociosYAfiliaciones = async () => {
      try {
        const respSocios = await getSocios()
        const arr = respSocios?.data?.data ?? []
        const filtrados = arr.filter((s) => s.id && s.nombre && s.apellido)
        setSocios(filtrados)

        const respAfiliaciones = await getAfiliaciones()
        const todas = respAfiliaciones?.data?.data ?? []
        const agrupadas = {}
        todas.forEach((a) => {
          const id = a.socio?.id
          if (!id) return
          if (!agrupadas[id]) agrupadas[id] = []
          agrupadas[id].push(a)
        })
        setAfiliacionesPorSocio(agrupadas)
      } catch (error) {
        console.error('Error al cargar socios o afiliaciones:', error)
        setErrorSocios(true)
      } finally {
        setLoadingSocios(false)
      }
    }

    fetchSociosYAfiliaciones()
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
    setModalEditarVisible(true)
  }

  const guardarEdicionCuota = async () => {
    try {
      await actualizarCuota(cuotaEditando.id, {
        pagada: formPago.pagada,
        fechaPago: formPago.pagada ? formPago.fechaPago : null, // ← sin toISOString
      });

      setCuotasPorSocio((prev) => {
        const actualizadas = prev[cuotaEditando.socioId].map((c) =>
          c.id === cuotaEditando.id
            ? { ...c, pagada: formPago.pagada, fechaPago: formPago.fechaPago }
            : c
        )
        return { ...prev, [cuotaEditando.socioId]: actualizadas }
      })

      setModalEditarVisible(false)
      setCuotaEditando(null)
    } catch (error) {
      console.error('Error al actualizar cuota:', error)
    }
  }

  const abrirModalNuevaCuota = (socio) => {
    setSocioSeleccionado(socio)
    setFormNuevaCuota({ monto: '' })
    setModalNuevaVisible(true)
  }

  const guardarNuevaCuota = async () => {
    if (!socioSeleccionado) return

    const afiliaciones = afiliacionesPorSocio[socioSeleccionado.id] || []
    const tieneActiva = afiliaciones.some((a) => !a.fechaFin)

    if (!tieneActiva) {
      alert('Este socio no tiene una afiliación activa. No se puede crear una cuota mensual.')
      return
    }

    try {
      const fechaVencimiento = new Date()
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 1)

      const resp = await crearCuota({
        socio: socioSeleccionado.id,
        monto: Number(formNuevaCuota.monto),
        fechaVencimiento: fechaVencimiento.toISOString(),
        pagada: false,
      })

      const nueva = resp?.data?.data ?? {
        monto: Number(formNuevaCuota.monto),
        fechaVencimiento: fechaVencimiento.toISOString(),
      }

      setCuotasPorSocio((prev) => {
        const list = prev[socioSeleccionado.id] || []
        return { ...prev, [socioSeleccionado.id]: [...list, nueva] }
      })

      setModalNuevaVisible(false)
      setSocioSeleccionado(null)
    } catch (error) {
      console.error('Error al crear nueva cuota:', error)
    }
  }

  const toggleFiltroImpagas = (id) => {
    setMostrarSoloImpagas((prev) => ({ ...prev, [id]: !prev[id] }))
  }

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

  const sociosConNombreCompleto = socios.map((s) => ({ ...s, nombreCompleto: `${s.nombre} ${s.apellido}` }))

  const columns = [
    { key: 'id', label: 'ID', _style: { width: '10%' }, sorter: true },
    { key: 'nombreCompleto', label: 'Nombre completo', _style: { width: '70%' }, sorter: true },
    { key: 'acciones', label: '', _style: { width: '20%' }, filter: false, sorter: false },
  ]

  return (
    <CCard className="rounded shadow-sm p-3 mx-auto" style={{ maxWidth: '900px' }}>
      <CSmartTable
        columns={columns}
        items={sociosConNombreCompleto}
        itemsPerPage={5}
        pagination
        tableFilter
        sorter
        scopedColumns={{
          nombreCompleto: (item) => <td>{item.nombreCompleto}</td>,
          acciones: (item) => (
            <td className="py-2">
              <CButton
                size="sm"
                color="primary"
                variant="outline"
                className="float-end"
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
            const cuotasFiltradas = soloImpagas ? cuotas.filter((c) => !c.pagada) : cuotas

            return (
              <CCollapse visible={details.includes(item.id)}>
                <div className="p-2 border-start border-primary">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Cuotas mensuales de {item.nombreCompleto}</h6>
                    <div className="d-flex gap-2">
                      <CButton
                        size="sm"
                        color="secondary"
                        variant="outline"
                        onClick={() => toggleFiltroImpagas(item.id)}
                      >
                        {soloImpagas ? 'Mostrar todas' : 'Mostrar solo impagas'}
                      </CButton>
                      <CButton
                        size="sm"
                        color="success"
                        onClick={() => abrirModalNuevaCuota(item)}
                      >
                        Nueva cuota
                      </CButton>
                    </div>
                  </div>
                  {loading ? (
                    <CSpinner size="sm" color="primary" />
                  ) : cuotasFiltradas.length === 0 ? (
                    <p className="text-muted">No hay cuotas para mostrar.</p>
                  ) : (
                    <table className="table table-sm table-bordered align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Vencimiento</th>
                          <th>Monto</th>
                          <th>Estado</th>
                          <th>Fecha de pago</th>
                          <th>Editar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cuotasFiltradas.slice().reverse().map((cuota) => (
                          <tr key={cuota.id}>
                            <td>{new Date(cuota.fechaVencimiento).toLocaleDateString()}</td>
                            <td>${cuota.monto}</td>
                            <td className={cuota.pagada ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                              {cuota.pagada ? '✅ Pagada' : '❌ Impaga'}
                            </td>
                            <td>
                              {cuota.fechaPago
                                ? new Date(
                                    cuota.fechaPago.includes('T')
                                      ? cuota.fechaPago
                                      : `${cuota.fechaPago}T00:00:00`
                                  ).toLocaleDateString()
                                : '-'}
                            </td>
                            <td>
                              <CButton
                                size="sm"
                                color="warning"
                                style={{ color: '#fff' }}
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
        tableProps={{ responsive: true, striped: true, hover: true, className: 'table-sm' }}
        tableBodyProps={{ className: 'align-middle' }}
      />

      {/* Modal Editar */}
      <CModal visible={modalEditarVisible} onClose={() => setModalEditarVisible(false)}>
        <CModalHeader>
          <CModalTitle>Editar cuota</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <label>¿Está pagada?</label>
          <select
            className="form-select mb-2"
            value={formPago.pagada ? 'sí' : 'no'}
            onChange={(e) => setFormPago((prev) => ({ ...prev, pagada: e.target.value === 'sí' }))}
          >
            <option value="no">No</option>
            <option value="sí">Sí</option>
          </select>
          {formPago.pagada && (
            <>
              <label>Fecha de pago</label>
              <CFormInput
                type="date"
                value={formPago.fechaPago}
                onChange={(e) => setFormPago((prev) => ({ ...prev, fechaPago: e.target.value }))}
              />
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalEditarVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={guardarEdicionCuota}>
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Nueva Cuota */}
      <CModal visible={modalNuevaVisible} onClose={() => setModalNuevaVisible(false)}>
        <CModalHeader>
          <CModalTitle>Nueva cuota</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <label>Monto</label>
          <CFormInput
            type="number"
            value={formNuevaCuota.monto}
            onChange={(e) => setFormNuevaCuota({ monto: e.target.value })}
          />
          <p className="text-muted mt-2">
            Fecha de vencimiento: {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalNuevaVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="success" onClick={guardarNuevaCuota}>
            Crear
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}
