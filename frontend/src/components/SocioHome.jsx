import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CRow,
  CCol,
} from '@coreui/react';
import { cilPool, cilBoatAlt, cilCalendar, cilWallet } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

export default function SocioHome({onSeleccion}) {
  const modules = [
    {
      title: 'Embarcaciones',
      icon: cilBoatAlt,
      link: 'embarcaciones',
      desc: 'Ver mis embarcaciones',
    },
    {
      title: 'Amarras y boxes',
      icon: cilPool,
      link: 'amarras',
      desc: 'Ver mis amarras y boxes en uso',
    },
    {
      title: 'Reservas',
      icon: cilCalendar,
      link: 'reservas',
      desc: 'Reservar embarcación del club',
    },
    {
      title: 'Cuotas y pagos',
      icon: cilWallet,
      link: 'cuotas',
      desc: 'Listado de mis cuotas',
    },
  ];

  return (
    <div className="socio-container">
      <h1 className="socio-title">Panel de Socio</h1>

      <CRow className="g-4">
        {modules.map((m, idx) => (
          <CCol xs={12} sm={6} md={3} key={idx}>
            <CCard
              className="socio-card"
              onClick={() => onSeleccion(m.link)}
            >
              <CCardBody className="text-center">
                <CIcon icon={m.icon} size="3xl" className="socio-icon"    />
                <CCardTitle>{m.title}</CCardTitle>
                <CCardText>{m.desc}</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  );
}