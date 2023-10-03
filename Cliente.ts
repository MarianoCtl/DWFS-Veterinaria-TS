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

    public eliminarMascotaDeCliente(id:number):void{
        let mascotas1 = this.mascotas.filter((mascota)=> mascota.getId()!==id);
        console.log(`La mascota ha sido eliminada.`);  
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

    public returnPaciente(id:number):Paciente{
        for(let i = 0; i < this.mascotas.length;i++){
            if(this.mascotas[i].getId()==id){
                return this.mascotas[i];                
            }
        }
        return this.mascotas[0];
    }
    
    public modificarNombreMascota(id: number, nuevoNombre: string): void {
        let mascota = this.mascotas.find(mascota => mascota.getId() == id);
    
        if (mascota) {
            console.log(`El nombre de la mascota ${mascota.getNombre()} ha sido modificado a ${nuevoNombre}.`);
            mascota.setNombre(nuevoNombre);
        } else {
            console.log(`La mascota ${id} no existe.`);
        }
    }
    
    public modificarEspecieMascota(id: number, nuevaEspecie: string): void {
        let mascota = this.mascotas.find(mascota => mascota.getId() == id);
    
        if (mascota) {
            mascota.setEspecie(nuevaEspecie);
            console.log(`La especie de la mascota ${mascota.getNombre()} ha sido modificada a ${nuevaEspecie}.`);
        } else {
            console.log(`La mascota ${id} no existe.`);
        }
    }
    
    public modificarObservacionMascota(id: number, nuevaObs: string): void {
        let mascota = this.mascotas.find(mascota => mascota.getId() == id);
    
        if (mascota) {
            mascota.setObservacion(nuevaObs);
            console.log(`La observación de la mascota ${mascota.getNombre()} ha sido modificada a ${nuevaObs}.`);
        } else {
            console.log(`La mascota ${id} no existe.`);
        }
    }
}