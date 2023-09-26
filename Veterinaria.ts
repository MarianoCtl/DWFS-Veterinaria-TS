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
    public eliminarSucursal(nombre: string): void {
        let indexSucursal = this.sucursales.findIndex(sucursal => sucursal.getNombreSucursal().toUpperCase() == nombre.toUpperCase());
    
        if (indexSucursal != -1) {
            this.sucursales.splice(indexSucursal, 1);
            console.log(`La sucursal ${nombre} ha sido eliminada.`);
        } else {
            console.log(`La sucursal ${nombre} no se encuentra en la veterinaria.`);
        }
    }
    public listarSucursales(): void {
        console.log("Listado de Sucursales:");
        this.sucursales.forEach(sucursal => {
            console.log(`N°: ${sucursal.getIdSucursal()} - Nombre: ${sucursal.getNombreSucursal()} - Direccion: ${sucursal.getDireccionSucursal()}`);
        });
    }

    public modificarNombreSucursal(nombreAnterior: string, nuevoNombre: string): void {
        let sucursal = this.sucursales.find(sucursal => sucursal.getNombreSucursal().toUpperCase() == nombreAnterior.toUpperCase());
    
        if (sucursal) {
            sucursal.modificarNombreSucursal(nuevoNombre);
            console.log(`El nombre de la sucursal ${nombreAnterior} ha sido modificado a ${nuevoNombre}.`);
        } else {
            console.log(`La sucursal ${nombreAnterior} no se encuentra.`);
        }
    }
    public modificarDireccionSucursal(nombre: string, nuevaDir: string): void {
        let sucursal = this.sucursales.find(sucursal => sucursal.getNombreSucursal().toUpperCase() == nombre.toUpperCase());
    
        if (sucursal) {
            sucursal.modificarDireccion(nuevaDir);
            console.log(`La direccion de la sucursal ${nombre} ha sido modificada a ${nuevaDir}.`);
        } else {
            console.log(`La sucursal ${nombre} no se encuentra.`);
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

    public returnSucursal(nombre:string):Sucursal{
        for(let i = 0; i < this.sucursales.length;i++){
            if(this.sucursales[i].getNombreSucursal().toUpperCase()==nombre.toUpperCase()){
                return this.sucursales[i];                
            }
        }
        return this.sucursales[0];
    }
}