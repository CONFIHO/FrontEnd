import { Rol } from "./Rol";

export class User{
    constructor(
        public id: number,
        public name: string,
        public password: string,
        public email: string,
        public rol: Rol,
        public enabled: boolean,
    ){}
}