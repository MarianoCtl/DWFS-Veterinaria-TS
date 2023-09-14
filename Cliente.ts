import { Paciente } from "./Paciente";
import { Persona}  from "./Persona";
import * as rls from 'readline-sync';

export class Cliente extends Persona{
    private vip: number;
    private mascotas:Paciente[];
    
    
    public constructor(id:number, nombre:string, tel:number){
        super(id,nombre,tel);
        this.vip = 0;
        this.mascotas = [];
    }

    
    public agregarMascota(idCliente:number):void{
        this.mascotas.push(new Paciente(rls.question("Ingrese nombre de Mascota: ").toUpperCase(),rls.question("Ingrese especie: "),idCliente,rls.question("Ingrese observación: ")));
    }

    public getVip():number{
        return this.vip
    }

    public getMascota(nombre:string):void{
        let mascotaBuscada = this.mascotas.find((mascota)=> mascota.getNombre()===nombre.toUpperCase());
        console.log(mascotaBuscada);        
    }

    public getMascotas():void{
        for(let i = 0; i < this.mascotas.length;i++){
            console.log(this.mascotas[i]);
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

    

}