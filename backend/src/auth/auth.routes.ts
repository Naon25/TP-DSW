import { Router, Request, Response } from 'express';
import { orm } from '../shared/orm.js';
import { Socio } from '../socio/socio.entity.js';
import { Administrador } from '../administrador/administrador.entity.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const em = orm.em.fork();

  try {
    let tipo = 'socio';
    let socio = await em.findOne(Socio, { email });

    if (!socio) {
      const admin = await em.findOne(Administrador, { email });
      if (!admin) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      const passwordValida = await bcrypt.compare(password, admin.password);
      if (!passwordValida) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ id: admin.id, tipo: 'admin' }, 'clave_secreta', { expiresIn: '1h' });

      return res.json({
        token,
        tipo: 'admin',
        admin: {
          id: admin.id,
          nombre: admin.nombre,
          apellido: admin.apellido,
          email: admin.email,
        },
      });
    }

    const passwordValida = await bcrypt.compare(password, socio.password);
    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: socio.id, tipo: 'socio' }, 'clave_secreta', { expiresIn: '1h' });

    return res.json({
      token,
      tipo: 'socio',
      socio: {
        id: socio.id,
        nombre: socio.nombre,
        apellido: socio.apellido,
        email: socio.email,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export const authRouter = router;
