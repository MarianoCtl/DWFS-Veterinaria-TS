import { Persona } from "./Persona";
import { ProductoProveedor } from "./ProductoProveedor";

export class Proveedor extends Persona {
    private productos: ProductoProveedor[] = [];

    constructor(id:number, nombre:string, tel:number){
        super(id,nombre,tel);
    }

    public listarProductos(): void{
        if(this.productos.length>0){
            console.log("Productos del proveedor:");
            this.productos.forEach(producto => {
                console.log(`Nombre: ${producto.getProducto()}`);
            });
        }else{
            console.log(`No hay productos creados.`);            
        }
    }

    public setProducto(nombre:string): void{
        let nuevoProducto = new ProductoProveedor(nombre.toUpperCase());
        this.productos.push(nuevoProducto);
    }

    public eliminarProducto(nombre: string): void {
        let indexProducto = this.productos.findIndex(p => p.getProducto() == nombre.toUpperCase());

        if (indexProducto != -1) {
            this.productos.splice(indexProducto, 1);
            console.log(`El producto ${nombre} ha sido eliminado del proveedor.`);
        } else {
            console.log(`El producto ${nombre} no se encuentra en el proveedor.`);
        }
    }

    public comprarProducto(nombre:string, cant:number):void{
        let productoEnProveedor = this.productos.find(p => p.getProducto() == nombre.toUpperCase());

        if(productoEnProveedor){
            console.log(`Ha comprado ${cant} ${nombre} al Proveedor.`);        
        }else{
            console.log('El proveedor no cuenta con el producto.');            
        }
    }
}