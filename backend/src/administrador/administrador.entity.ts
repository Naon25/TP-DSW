import crypto from 'node:crypto';

export class Administrador{
    constructor(
        public nombre:string,
        public email:string,
        public id?: number
    ){}
}