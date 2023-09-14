export class Persona {
    private id:number;
    private nombre:string;
    private telefono:number;


    constructor(id:number, nombre:string, tel:number) {
        this.id=id;
        this.nombre=nombre;
        this.telefono=tel;
    }

    public getId():number{
        return this.id;
    }

    public getNombre():string{
        return this.nombre;
    }

    public setNombre(nuevoNombre:string){
        this.nombre=nuevoNombre;
    }

    public getTelefono():number{
        return this.telefono;
    }

    public setTelefono(nuevoTel:number){
        this.telefono=nuevoTel;
    }
}