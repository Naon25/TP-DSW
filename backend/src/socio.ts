import crypto from 'node:crypto'

export class Socio{
    constructor(
        public nombre:string,
        public dni:string,
        public email:string,
        public telefono:string,
        public id = crypto.randomUUID()
    ){}
}

