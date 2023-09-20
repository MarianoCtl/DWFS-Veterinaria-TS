import * as readLineSync from 'readline-sync';
import { Veterinaria } from './Veterinaria';
import { Sucursal } from './Sucursal';
import { Cliente } from './Cliente';
import { Proveedor } from './Proveedor';

let nombreVeterinaria:string = readLineSync.question('Ingrese el nombre de su veterinaria: ');
let direccionVeterinaria:string = readLineSync.question('Ingrese la direccion de su veterinaria: ');

const centralVeterinaria = new Veterinaria(nombreVeterinaria, direccionVeterinaria);
console.log(`------------`);
console.log(`Bienvenid@ a la central ${centralVeterinaria.getNombre()}!`);

let finSucursales:boolean = false;
centralVeterinaria.nuevaSucursal(nombreVeterinaria,direccionVeterinaria);
while(finSucursales==false){
    centralVeterinaria.listarSucursales();
    console.log(`100 - Crear sucursal`);    
    let opcionSucursal:number = readLineSync.questionInt('Ingrese el Numero de Sucursal o 100 para crear una nueva: ');
    
    
}

