import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {CCard,CCardHeader,CCardBody,CRow,CCol,CForm,CFormInput,CButton,} from '@coreui/react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      const { token, tipo } = await res.json();
      localStorage.setItem('token', token);
      localStorage.setItem('tipo', tipo);

      navigate(tipo === 'admin' ? '/admin' : '/socio');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <CRow className="d-flex justify-content-center">
      <CCol xs={12} sm={8} md={6} lg={4}>
        <CCard className="mt-5">
          <CCardHeader>
            <h4>Iniciar Sesión</h4>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CFormInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-3"
              />
              <CFormInput
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-3"
              />
              <div className="d-grid gap-2">
                <CButton color="primary" type="submit">
                  Entrar
                </CButton>
              </div>
              {error && <p className="mt-3" style={{ color: 'red' }}>{error}</p>}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}