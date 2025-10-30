import { Request, Response, NextFunction } from "express";
import { Administrador } from "./administrador.entity.js";
import { orm } from "../shared/orm.js";
import bcrypt from "bcrypt";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const em = orm.em;

function sanitizeAdministradorInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        dni: req.body.dni,
        password: req.body.password,
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}

async function findAll(req: Request, res: Response) {
    try {
        const administradores = await em.find(Administrador, {}); 
        res.status(200).json({ message: 'Todos los administradores encontrados', data: administradores });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id);
        const administrador = await em.findOneOrFail(Administrador, { id });
        res.status(200).json({ message: 'Administrador encontrado', data: administrador });
    } catch (error: any) {
        if (error.name === 'NotFoundError') {
            res.status(404).json({ message: 'Administrador no encontrado' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

async function add(req: Request, res: Response) {
    try {
        // Validar datos antes de crear el administrador
        const administradorInstance = plainToInstance(Administrador, req.body);
        const errors = await validate(administradorInstance);

        if (errors.length > 0) {
            const messages = errors.map((err) => Object.values(err.constraints || {})).flat();
            return res.status(400).json({ message: 'Error de validación', errors: messages });
        }

        const newAdministrador = em.create(Administrador, req.body);
        await em.flush();
        res.status(201).json({ 
            message: 'Administrador creado correctamente (contraseña generada a partir del DNI)', 
            data: newAdministrador 
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id);
        const administradorToUpdate = await em.findOneOrFail(Administrador, { id });

        // Validar datos nuevos
        const administradorInstance = plainToInstance(Administrador, req.body);
        const errors = await validate(administradorInstance, { skipMissingProperties: true });

        if (errors.length > 0) {
            const messages = errors.map((err) => Object.values(err.constraints || {})).flat();
            return res.status(400).json({ message: 'Error de validación', errors: messages });
        }

        const updatedData = { ...req.body };

        if (updatedData.password) {
            const saltRounds = 10;
            updatedData.password = await bcrypt.hash(updatedData.password, saltRounds);
        }

        em.assign(administradorToUpdate, updatedData);
        await em.flush();

        res.status(200).json({ message: "Administrador actualizado correctamente" });
    } catch (error: any) {
        if (error.name === 'NotFoundError') {
            res.status(404).json({ message: 'Administrador no encontrado' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id);
        const administradorToRemove = await em.findOneOrFail(Administrador, { id });
        await em.removeAndFlush(administradorToRemove);
        res.status(200).json({ message: 'Administrador eliminado correctamente' });    
    } catch (error: any) {
        if (error.name === 'NotFoundError') {
            res.status(404).json({ message: 'Administrador no encontrado' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

export { sanitizeAdministradorInput, findAll, findOne, add, update, remove };