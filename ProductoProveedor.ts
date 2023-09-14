export class ProductoProveedor {
    private nombre:string;

    constructor(nombre:string){
        this.nombre=nombre;
    }

    public getProducto():string{
        return this.nombre;
    }

    public setProducto(nuevoNombre:string){
        this.nombre=nuevoNombre;
    }
}