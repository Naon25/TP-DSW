import { useEffect, useState } from 'react';
import { getSocios, crearSocio } from '../api/socios';

export default function Socios() {
  const [socios, setSocios] = useState([]);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    getSocios().then((res) => setSocios(res.data));
  }, []);

  const handleCrear = async () => {
    await crearSocio({ nombre });
    const res = await getSocios();
    setSocios(res.data);
    setNombre('');
  };

  return (
    <div>
      <h2>SOCIOS</h2>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del socio"
      />
      <button onClick={handleCrear}>Crear</button>

      <ul>
        {socios.map((s) => (
          <li key={s.id}>{s.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
