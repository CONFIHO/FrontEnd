import { Rol } from "./Rol";

export class User{
    constructor(
        public names: string,
        public lastnames: string,
        public email: string,
        public rol: Rol,
        public enabled: boolean,
    ){}
}