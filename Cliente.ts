import { Paciente } from "./Paciente";
import { Persona}  from "./Persona";


export class Cliente extends Persona{
    private vip: number;
    private mascotas:Paciente[];
    
    
    public constructor(id:number, nombre:string, tel:number){
        super(id,nombre,tel);
        this.vip = 0;
        this.mascotas = [];
    }

    
    public agregarMascota(nombre:string, especie: string, idCliente:number, observacion?:string):void{
        this.mascotas.push(new Paciente(nombre,especie,idCliente,observacion));
    }

    public getVip():number{
        return this.vip
    }

    public getMascota(nombre:string):void{
        let mascotaBuscada = this.mascotas.find((mascota)=> mascota.getNombre()===nombre.toUpperCase());
        console.log(mascotaBuscada);        
    }

    public getMascotas():void{
        if(this.mascotas.length>0){
            console.log("Listado de mascotas:");
            this.mascotas.forEach(mascota => {
                console.log(`N°: ${mascota.getId()} - Nombre: ${mascota.getNombre()} - Especie: ${mascota.getEspecie()} - Observación: ${mascota.getObservacion()}`);
            });
        }else{
            console.log(`No hay mascotas creados.`);            
        }
    }

    public eliminarMascota(nombre:string):void{
        let mascotas1 = this.mascotas.filter((mascota)=> mascota.getNombre()!==nombre.toUpperCase());
        this.mascotas = mascotas1;

    }
    public restarVip():void{
        this.vip -=1;
    }
    
    public altaConsulta():void{
        this.vip += 1;
    }

    public seleccionarPaciente(id:number):string{
        let nombre:string="";
        for(let i = 0; i < this.mascotas.length;i++){
            if(this.mascotas[i].getId()==id){
                nombre = this.mascotas[i].getNombre();                
            }
        }
        return nombre;
    }

    public returnPaciente(nombre:string):Paciente{
        for(let i = 0; i < this.mascotas.length;i++){
            if(this.mascotas[i].getNombre().toUpperCase()==nombre.toUpperCase()){
                return this.mascotas[i];                
            }
        }
        return this.mascotas[0];
    }
    
    public modificarNombreMascota(nombreAnterior: string, nuevoNombre: string): void {
        let mascota = this.mascotas.find(mascota => mascota.getNombre().toUpperCase() == nombreAnterior.toUpperCase());
    
        if (mascota) {
            mascota.setNombre(nuevoNombre);
            console.log(`El nombre de la mascota ${nombreAnterior} ha sido modificado a ${nuevoNombre}.`);
        } else {
            console.log(`La mascota ${nombreAnterior} no existe.`);
        }
    }
    
    public modificarEspecieMascota(nombre: string, nuevaEspecie: string): void {
        let mascota = this.mascotas.find(mascota => mascota.getNombre().toUpperCase() == nombre.toUpperCase());
    
        if (mascota) {
            mascota.setEspecie(nuevaEspecie);
            console.log(`La especie de la mascota ${nombre} ha sido modificada a ${nuevaEspecie}.`);
        } else {
            console.log(`La mascota ${nombre} no existe.`);
        }
    }
    
    public modificarObservacionMascota(nombre: string, nuevaObs: string): void {
        let mascota = this.mascotas.find(mascota => mascota.getNombre().toUpperCase() == nombre.toUpperCase());
    
        if (mascota) {
            mascota.setObservacion(nuevaObs);
            console.log(`La observación de la mascota ${nombre} ha sido modificada a ${nuevaObs}.`);
        } else {
            console.log(`La mascota ${nombre} no existe.`);
        }
    }


}