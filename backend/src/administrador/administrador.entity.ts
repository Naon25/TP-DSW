import crypto from 'node:crypto';

export class Administrador{
    constructor(
        public id:string,
        public nombre:string,
        public email:string
    ){}
}