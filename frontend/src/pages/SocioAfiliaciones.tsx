import { useEffect, useState } from 'react';
import { getAfiliaciones } from '../api/afiliaciones.js';


export function SocioAfiliaciones({ idSocio }: { idSocio?: number | null }) {
  const [afiliaciones, setAfiliaciones] = useState([]);

  useEffect(() =>{
    if (idSocio == null) return;
    cargarAfiliaciones();
  }, [idSocio]);

  const cargarAfiliaciones = async () => {
    try {
      const response = await getAfiliaciones();
      setAfiliaciones(response.data);
    } catch (error) {
      console.error('Error al cargar las afiliaciones:', error);
    }
  }
}