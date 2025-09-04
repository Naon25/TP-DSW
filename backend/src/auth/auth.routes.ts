import { Router, Request, Response } from 'express'
import { orm } from '../shared/orm.js'
import { Socio } from '../socio/socio.entity.js'
import { Administrador } from '../administrador/administrador.entity.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  const em = orm.em.fork()

  try {
    // Buscar primero en Socio
    let usuario: Socio | Administrador | null = await em.findOne(Socio, { email })
    let tipo = 'socio'

    // Si no se encuentra, buscar en Administrador
    if (!usuario) {
      usuario = await em.findOne(Administrador, { email })
      tipo = 'admin'
    }

    // Si no se encuentra en ninguno, error
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' })
    }

    // Validar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password)
    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' })
    }

    // Generar token JWT
    const token = jwt.sign({ id: usuario.id, tipo }, 'clave_secreta', { expiresIn: '1h' })

    // Respuesta con datos del usuario
    return res.json({
      token,
      tipo,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
      },
    })
  } catch (error) {
    console.error('Error en login:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
})

export const authRouter = router
