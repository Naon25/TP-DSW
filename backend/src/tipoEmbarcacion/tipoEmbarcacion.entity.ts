import crypto from 'node:crypto';

export class tipoEmbarcacion{
    constructor(
        public nombre:string,
        public esloraMaxima:number,
        public id?: number
    ){}
}