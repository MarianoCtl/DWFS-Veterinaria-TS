export class Paciente{
    private id: number;
    private nombre: string;
    private especie: string;
    private idCliente: number;
    private observacion?: string;

    public constructor(nombre:string,especie:string,observacion?:string){
        this.id = 0;
        this.nombre = nombre;
        this.especie = especie;
        this.idCliente = 0;
        this.observacion = observacion || "";
    }
    public getId():number{
        return this.id;
    }
    public getNombre():string{
        return this.nombre;
    }
    public getEspecie():string{
        return this.especie;
    }
    public getIdCliente():number{
        return this.idCliente;
    }
    public getObservacion():string | undefined{
        return this.observacion;
    }

    public setNombre(nuevoNombre:string):void{
        this.nombre = nuevoNombre;
    }
    public setEspecie(nuevaEspecie:string):void{
        this.especie = nuevaEspecie;
    }
    public setIdCliente(nuevoIdCliente:number):void{
        this.idCliente = nuevoIdCliente;
    }
    public setObservacion(nuevaObservacion:string):void{
        this.observacion = nuevaObservacion;
    }



}