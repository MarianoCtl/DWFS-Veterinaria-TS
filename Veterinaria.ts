import { Sucursal } from "./Sucursal";

export class Veterinaria {
    private nombre: string;
    private direccion : string;
    private sucursales: Sucursal[];

    public constructor(nombre: string, direccion: string){
        this.nombre = nombre;
        this.direccion = direccion;
        this.sucursales = [];
    }

    public getNombre(): string{
        return this.nombre;
    }
    public getDireccion(): string{
        return this.direccion;
    }
    public setNombre(nuevoNombre:string): void{
        this.nombre = nuevoNombre;
    }
    public setDireccion(nuevaDireccion:string): void{
        this.direccion = nuevaDireccion;
    }

    public nuevaSucursal(nombre:string, direccion:string):void{
        let sucursalExistente = this.sucursales.find(sucursal=>sucursal.getNombreSucursal().toUpperCase()==nombre.toUpperCase());
        if(sucursalExistente){
            console.log(`La Sucursal ${nombre} ya existe.`);        
        }else{
            let id: number;
            do {
                id = Math.floor(Math.random() * 100)+1; 
            } while (this.sucursales.find(sucursal => sucursal.getIdSucursal() == id) != undefined);    

            let nuevaSucursal = new Sucursal(id, nombre,direccion);
            this.sucursales.push(nuevaSucursal);
        }
    }
    public eliminarSucursal(id: number): void {
        let indexSucursal = this.sucursales.findIndex(sucursal => sucursal.getIdSucursal() == id);
    
        if (indexSucursal != -1) {
            console.log(`La sucursal ${this.sucursales[indexSucursal].getNombreSucursal()} ha sido eliminada.`);
            this.sucursales.splice(indexSucursal, 1);
        } else {
            console.log(`La sucursal ${id} no se encuentra en la veterinaria.`);
        }
    }
    public listarSucursales(): void {
        console.log("Listado de Sucursales:");
        this.sucursales.forEach(sucursal => {
            console.log(`N°: ${sucursal.getIdSucursal()} - Nombre: ${sucursal.getNombreSucursal()} - Direccion: ${sucursal.getDireccionSucursal()}`);
        });
    }

    public modificarNombreSucursal(id: number, nuevoNombre: string): void {
        let sucursal = this.sucursales.find(sucursal => sucursal.getIdSucursal() == id);
    
        if (sucursal) {
            console.log(`El nombre de la sucursal ${sucursal.getNombreSucursal()} ha sido modificado a ${nuevoNombre}.`);
            sucursal.modificarNombreSucursal(nuevoNombre);
        } else {
            console.log(`La sucursal ${id} no se encuentra.`);
        }
    }
    public modificarDireccionSucursal(id: number, nuevaDir: string): void {
        let sucursal = this.sucursales.find(sucursal => sucursal.getIdSucursal() == id);
    
        if (sucursal) {
            console.log(`La direccion de la sucursal ${sucursal.getNombreSucursal()} ha sido modificada a ${nuevaDir}.`);
            sucursal.modificarDireccion(nuevaDir);
        } else {
            console.log(`La sucursal ${id} no se encuentra.`);
        }
    }

    public seleccionarSucursal(id:number):string{
        let nombre:string="";
        for(let i = 0; i < this.sucursales.length;i++){
            if(this.sucursales[i].getIdSucursal()==id){
                nombre = this.sucursales[i].getNombreSucursal();                
            }
        }
        return nombre;
    }

    public returnSucursal(id:number):Sucursal{
        for(let i = 0; i < this.sucursales.length;i++){
            if(this.sucursales[i].getIdSucursal()==id){
                return this.sucursales[i];                
            }
        }
        return this.sucursales[0];
    }
}