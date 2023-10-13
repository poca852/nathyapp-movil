import { Rol, Empresa, Ruta } from "./";

export interface User {
   _id: string;
   nombre: string;
   rol: Rol;
   estado: boolean;
   ruta: Ruta;
   username: string;
   empresa: Empresa;
   token?: string;
 }