import { Cliente}  from "./Cliente";
import { Proveedor}  from "./Proveedor";

export class Sucursal {
    private id: number;
    private nombre: string;
    private direccion: string;
    private clientes: Cliente[] = [];
    private proveedores: Proveedor[] = [];

    constructor(id: number, nombre: string, direccion: string) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.nuevoCliente("CONSUMIDOR FINAL", 0);
        this.nuevoProveedor("STOCK INICIAL", 0);
    }

    public getIdSucursal(){
        return this.id;
    }

    public getNombreSucursal(){
        return this.nombre;
    }

    public getDireccionSucursal(){
        return this.direccion;
    }
    
    public modificarNombreSucursal(nuevoNombre: string): void {
        this.nombre = nuevoNombre;
    }

    public modificarDireccion(nuevaDireccion: string): void {
        this.direccion = nuevaDireccion;
    }

    public listarClientes(): void {
        if(this.clientes.length>0){
            console.log("Listado de clientes:");
            this.clientes.forEach(cliente => {
                console.log(`N°: ${cliente.getId()} - Nombre: ${cliente.getNombre()} - Teléfono: ${cliente.getTelefono()}`);
            });
        }else{
            console.log(`No hay clientes creados.`);            
        }
    }

    public listarProveedores(): void {
        if(this.proveedores.length>0){
            console.log("Listado de proveedores:");
            this.proveedores.forEach(proveedor => {
                console.log(`N°: ${proveedor.getId()} - Nombre: ${proveedor.getNombre()} - Teléfono: ${proveedor.getTelefono()}`);
            });
        }else{
            console.log(`No hay proveedores creados.`);            
        }
    }

    public nuevoCliente(nombre: string, tel: number): void {
        let clienteExistente = this.clientes.find(cliente => cliente.getNombre().toUpperCase() == nombre.toUpperCase());

        if(clienteExistente){
            console.log(`El cliente ${nombre} ya existe.`);        
        }else{
            let id: number;
            do {
                id = Math.floor(Math.random() * 10000)+1;
            } while (this.clientes.find(cliente => cliente.getId() == id) != undefined);    

            let nuevoCliente = new Cliente(id, nombre, tel);
            this.clientes.push(nuevoCliente);
        }
    }

    public nuevoProveedor(nombre: string, tel: number): void {
        let proveedorExistente = this.proveedores.find(proveedor => proveedor.getNombre().toUpperCase() == nombre.toUpperCase());

        if(proveedorExistente){
            console.log(`El proveedor ${nombre} ya existe.`);        
        }else{
            let id: number;
            do {
                id = Math.floor(Math.random() * 10000)+1; 
            } while (this.proveedores.find(proveedor => proveedor.getId() == id) != undefined);    

            let nuevoProveedor = new Proveedor(id, nombre, tel);
            this.proveedores.push(nuevoProveedor);
        }
    }

    public eliminarCliente(id: number): void {
        let indexCliente = this.clientes.findIndex(cliente => cliente.getId() == id);
    
        if (indexCliente != -1) {
            console.log(`El cliente ${this.clientes[indexCliente].getNombre()} ha sido eliminado de la sucursal.`);
            this.clientes.splice(indexCliente, 1);
        } else {
            console.log(`El cliente ${id} no se encuentra en la sucursal.`);
        }
    }

    public eliminarProveedor(id: number): void {
        let indexProveedor = this.proveedores.findIndex(proveedor => proveedor.getId() == id);
    
        if (indexProveedor != -1) {
            this.proveedores.splice(indexProveedor, 1);
            console.log(`El proveedor ${this.proveedores[indexProveedor].getNombre()} ha sido eliminado de la sucursal.`);
        } else {
            console.log(`El proveedor ${id} no se encuentra en la sucursal.`);
        }
    }

    public modificarNombreCliente(id: number, nuevoNombre: string): void {
        let cliente = this.clientes.find(cliente => cliente.getId() == id);
    
        if (cliente) {
            console.log(`El nombre del cliente ${cliente.getNombre()} ha sido modificado a ${nuevoNombre}.`);
            cliente.setNombre(nuevoNombre);
        } else {
            console.log(`El cliente ${id} no se encuentra en la sucursal.`);
        }
    }

    public modificarNombreProveedor(id: number, nuevoNombre: string): void {
        let proveedor = this.proveedores.find(proveedor => proveedor.getId() == id);
    
        if (proveedor) {
            console.log(`El nombre del proveedor ${proveedor.getNombre()} ha sido modificado a ${nuevoNombre}.`);
            proveedor.setNombre(nuevoNombre);
        } else {
            console.log(`El proveedor ${id} no se encuentra en la sucursal.`);
        }
    }

    public modificarTelefonoCliente(id: number, nuevoTel: number): void {
        let cliente = this.clientes.find(cliente => cliente.getId() == id);
    
        if (cliente) {
            cliente.setTelefono(nuevoTel);
            console.log(`El teléfono del cliente ${cliente.getNombre()} ha sido modificado a ${nuevoTel}.`);
        } else {
            console.log(`El cliente ${id} no se encuentra en la sucursal.`);
        }
    }

    public modificarTelefonoProveedor(id: number, nuevoTel: number): void {
        let proveedor = this.proveedores.find(proveedor => proveedor.getId() == id);
    
        if (proveedor) {
            proveedor.setTelefono(nuevoTel);
            console.log(`El teléfono del proveedor ${proveedor.getNombre()} ha sido modificado a ${nuevoTel}.`);
        } else {
            console.log(`El proveedor ${id} no se encuentra en la sucursal.`);
        }
    }

    public seleccionarCliente(id:number):string{
        let nombre:string="";
        for(let i = 0; i < this.clientes.length;i++){
            if(this.clientes[i].getId()==id){
                nombre = this.clientes[i].getNombre();                
            }
        }
        return nombre;
    }

    public seleccionarProveedor(id:number):string{
        let nombre:string="";
        for(let i = 0; i < this.proveedores.length;i++){
            if(this.proveedores[i].getId()==id){
                nombre = this.proveedores[i].getNombre();                
            }
        }
        return nombre;
    }

    public returnCliente(id:number):Cliente{
        for(let i = 0; i < this.clientes.length;i++){
            if(this.clientes[i].getId()==id){
                return this.clientes[i];                
            }
        }
        return this.clientes[0];
    }

    public returnProveedor(id:number):Proveedor{
        for(let i = 0; i < this.proveedores.length;i++){
            if(this.proveedores[i].getId()==id){
                return this.proveedores[i];                
            }
        }
        return this.proveedores[0];
    }

    public venderProducto(nombre:string, cant:number):void{
        let i=0;
        let encontro:boolean=false;
        while (i<this.proveedores.length && encontro==false) {
            let proveedor:Proveedor = this.returnProveedor(this.proveedores[i].getId());
            let productos = proveedor.returnProductos();            
            let j=0;
            while (j<productos.length && encontro==false) {
                if(productos[j]== nombre.toUpperCase()){
                    console.log(`Ha vendido ${cant} ${nombre} al cliente.`);    
                    encontro=true;                
                }     
                j++;           
            }
            i++;
        }
        if(!encontro){
            console.log(`El producto ${nombre} no se encuentra en stock.`);            
        }
    }
}