import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCollapse,
  CSmartTable,
  CCard,
  CSpinner,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'

import {
  getEmbarcacionesPorSocio,
  getEmbarcacionesClub,
  crearEmbarcacion,
  eliminarEmbarcacion,
} from '../api/embarcaciones.js'
import { getSocios } from '../api/socios.js'
import { getTiposEmbarcacion } from '../api/tiposEmbarcacion.js'

const AdministrarEmbarcacionesSocios = () => {
  const [socios, setSocios] = useState([])
  const [details, setDetails] = useState([])
  const [embarcacionesPorSocio, setEmbarcacionesPorSocio] = useState({})
  const [embarcacionesClub, setEmbarcacionesClub] = useState([])
  const [loadingSocios, setLoadingSocios] = useState(true)
  const [loadingEmbarcaciones, setLoadingEmbarcaciones] = useState({})
  const [loadingClub, setLoadingClub] = useState(false)
  const [modalNuevaVisible, setModalNuevaVisible] = useState(false)
  const [socioSeleccionado, setSocioSeleccionado] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    matricula: '',
    eslora: '',
    tipoEmbarcacion: '',
  })
  const [tiposEmbarcacion, setTiposEmbarcacion] = useState([])

  // 🔹 Cargar socios
  useEffect(() => {
    const fetchSocios = async () => {
      try {
        const resp = await getSocios()
        const arr = resp?.data?.data ?? resp?.data ?? []
        setSocios(Array.isArray(arr) ? arr : [])
      } catch (error) {
        console.error('Error cargando socios:', error)
      } finally {
        setLoadingSocios(false)
      }
    }
    fetchSocios()
  }, [])

  // 🔹 Cargar tipos de embarcación
  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const resp = await getTiposEmbarcacion()
        const arr = resp?.data?.data ?? resp?.data ?? []
        setTiposEmbarcacion(arr)
      } catch (error) {
        console.error('Error al obtener tipos de embarcación:', error)
      }
    }
    fetchTipos()
  }, [])

  // 🔹 Cargar embarcaciones del club
  const cargarEmbarcacionesClub = async () => {
    setLoadingClub(true)
    try {
      const resp = await getEmbarcacionesClub()
      const arr = resp?.data?.data ?? []
      setEmbarcacionesClub(arr)
    } catch (error) {
      console.error('Error obteniendo embarcaciones del club:', error)
    } finally {
      setLoadingClub(false)
    }
  }

  useEffect(() => {
    cargarEmbarcacionesClub()
  }, [])

  // 🔹 Mostrar embarcaciones del socio
  const toggleDetails = async (idSocio) => {
    const isOpen = details.includes(idSocio)
    const newDetails = isOpen ? details.filter((i) => i !== idSocio) : [...details, idSocio]
    setDetails(newDetails)

    if (!isOpen && !embarcacionesPorSocio[idSocio]) {
      setLoadingEmbarcaciones((prev) => ({ ...prev, [idSocio]: true }))
      try {
        const resp = await getEmbarcacionesPorSocio(idSocio)
        const arr = resp?.data?.data ?? []
        setEmbarcacionesPorSocio((prev) => ({ ...prev, [idSocio]: arr }))
      } catch (error) {
        console.error('Error obteniendo embarcaciones del socio:', error)
        setEmbarcacionesPorSocio((prev) => ({ ...prev, [idSocio]: [] }))
      } finally {
        setLoadingEmbarcaciones((prev) => ({ ...prev, [idSocio]: false }))
      }
    }
  }

  // 🔹 Eliminar embarcación
  const borrarEmbarcacion = async (idEmbarcacion, socioId = null) => {
    try {
      await eliminarEmbarcacion(idEmbarcacion)
      if (socioId) {
        setEmbarcacionesPorSocio((prev) => ({
          ...prev,
          [socioId]: prev[socioId]?.filter((e) => e.id !== idEmbarcacion),
        }))
      } else {
        setEmbarcacionesClub((prev) => prev.filter((e) => e.id !== idEmbarcacion))
      }
    } catch (error) {
      console.error('Error al eliminar embarcación:', error)
    }
  }

  // 🔹 Modal nueva embarcación
  const abrirModalNueva = (socioId) => {
    setSocioSeleccionado(socioId)
    setFormData({
      nombre: '',
      matricula: '',
      eslora: '',
      tipoEmbarcacion: '',
    })
    setModalNuevaVisible(true)
  }

  const guardarNueva = async () => {
    if (!formData.nombre || !formData.matricula || !formData.eslora || !formData.tipoEmbarcacion) {
      alert('Complete todos los campos')
      return
    }

    const payload = {
      nombre: formData.nombre,
      matricula: formData.matricula,
      eslora: Number(formData.eslora),
      tipoEmbarcacion: formData.tipoEmbarcacion,
      socio: socioSeleccionado, // puede ser null para el club
    }

    try {
      const resp = await crearEmbarcacion(payload)
      const creada = resp?.data?.data ?? payload

      if (socioSeleccionado) {
        setEmbarcacionesPorSocio((prev) => {
          const list = prev[socioSeleccionado] || []
          return { ...prev, [socioSeleccionado]: [...list, creada] }
        })
      } else {
        setEmbarcacionesClub((prev) => [...prev, creada])
      }

      setModalNuevaVisible(false)
      setSocioSeleccionado(null)
    } catch (error) {
      console.error('Error al crear embarcación:', error)
    }
  }

  const columns = [
    { key: 'id', label: 'ID', _style: { width: '10%' } },
    { key: 'nombreCompleto', label: 'Socio', _style: { width: '70%' } },
    { key: 'show_details', label: '', _style: { width: '1%' } },
  ]

  if (loadingSocios) {
    return (
      <CCard className="p-3 text-center mx-auto" style={{ maxWidth: '900px' }}>
        <CSpinner color="primary" />
        <p>Cargando socios...</p>
      </CCard>
    )
  }

  const sociosConNombreCompleto = socios.map((s) => ({
    ...s,
    nombreCompleto: `${s.nombre} ${s.apellido}`,
  }))

  return (
    <CCard className="rounded shadow-sm p-3 mx-auto" style={{ maxWidth: '900px' }}>
      {/* 🔹 Sección de embarcaciones del club */}
      <div className="mb-4 border-bottom pb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Embarcaciones del Club</h5>
          <CButton color="primary" onClick={() => abrirModalNueva(null)}>
            Nueva embarcación del club
          </CButton>
        </div>

        {loadingClub ? (
          <div className="text-center mt-3">
            <CSpinner color="primary" />
          </div>
        ) : embarcacionesClub.length === 0 ? (
          <p className="text-muted mt-3">No hay embarcaciones registradas del club.</p>
        ) : (
          <table className="table table-sm table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Matrícula</th>
                <th>Eslora</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {embarcacionesClub.map((e) => (
                <tr key={e.id}>
                  <td>{e.nombre}</td>
                  <td>{e.matricula}</td>
                  <td>{e.eslora}</td>
                  <td>{e.tipoEmbarcacion?.nombre ?? '---'}</td>
                  <td>
                    <CButton color="danger" size="sm" onClick={() => borrarEmbarcacion(e.id)}>
                      Eliminar
                    </CButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 🔹 Sección de embarcaciones por socio */}
      <CSmartTable
        columns={columns}
        items={sociosConNombreCompleto}
        itemsPerPage={20}
        pagination
        sorter={true} // ✅ corregido: booleano válido
        scopedColumns={{
          show_details: (item) => (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                size="sm"
                style={{ minWidth: '140px' }}
                onClick={() => toggleDetails(item.id)}
              >
                {details.includes(item.id) ? 'Ocultar' : 'Ver embarcaciones'}
              </CButton>
            </td>
          ),
          details: (item) => {
            const embarcaciones = embarcacionesPorSocio[item.id] || []
            const loading = loadingEmbarcaciones[item.id]
            return (
              <CCollapse visible={details.includes(item.id)}>
                <div className="p-3 border-start border-primary">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6>Embarcaciones de {item.nombre} {item.apellido}</h6>
                    <CButton size="sm" color="success" onClick={() => abrirModalNueva(item.id)}>
                      Nueva embarcación
                    </CButton>
                  </div>
                  {loading ? (
                    <CSpinner size="sm" color="primary" />
                  ) : embarcaciones.length === 0 ? (
                    <p className="text-muted">No hay embarcaciones registradas.</p>
                  ) : (
                    <table className="table table-sm table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Nombre</th>
                          <th>Matrícula</th>
                          <th>Eslora</th>
                          <th>Tipo</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {embarcaciones.map((e) => (
                          <tr key={e.id}>
                            <td>{e.nombre}</td>
                            <td>{e.matricula}</td>
                            <td>{e.eslora}</td>
                            <td>{e.tipoEmbarcacion?.nombre ?? '---'}</td>
                            <td>
                              <CButton
                                color="danger"
                                size="sm"
                                onClick={() => borrarEmbarcacion(e.id, item.id)}
                              >
                                Eliminar
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
      />

      {/* 🔹 Modal Nueva Embarcación */}
      <CModal visible={modalNuevaVisible} onClose={() => setModalNuevaVisible(false)}>
        <CModalHeader closeButton>Nueva embarcación</CModalHeader>
        <CModalBody>
          <CFormInput
            label="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
            className="mb-3"
          />
          <CFormInput
            label="Matrícula"
            value={formData.matricula}
            onChange={(e) => setFormData((prev) => ({ ...prev, matricula: e.target.value }))}
            className="mb-3"
          />
          <CFormInput
            label="Eslora (en metros)"
            type="number"
            value={formData.eslora}
            onChange={(e) => setFormData((prev) => ({ ...prev, eslora: e.target.value }))}
            className="mb-3"
          />
          <CFormSelect
            label="Tipo de embarcación"
            value={formData.tipoEmbarcacion}
            onChange={(e) => setFormData((prev) => ({ ...prev, tipoEmbarcacion: e.target.value }))}
          >
            <option value="">Seleccione un tipo</option>
            {tiposEmbarcacion.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </CFormSelect>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalNuevaVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="success" onClick={guardarNueva}>
            Crear
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default AdministrarEmbarcacionesSocios
