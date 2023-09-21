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
                console.log(`N°: ${mascota.getId()} - Nombre: ${mascota.getNombre()}`);
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
    

}