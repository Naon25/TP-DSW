export type Estado = 'libre' | 'ocupado'


export class Amarra{
    constructor(
        public estado: Estado,
        public precioMensualBase: number,
        public longitudMax: number,
        public zona: string,
        public nroPilon: number,
        public id?: number
    ){}
}