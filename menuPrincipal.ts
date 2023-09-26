import * as readLineSync from 'readline-sync';
import { Veterinaria } from './Veterinaria';

let nombreVeterinaria: string;
do {
    nombreVeterinaria = readLineSync.question('Ingrese el nombre de su veterinaria: ');
} while (!nombreVeterinaria.trim());
let direccionVeterinaria:string;
do {
    direccionVeterinaria = readLineSync.question('Ingrese la direccion de su veterinaria: ');
} while (!direccionVeterinaria.trim());

const centralVeterinaria = new Veterinaria(nombreVeterinaria, direccionVeterinaria);
console.log(`\n------------`);
console.log(`Bienvenid@ a la central ${centralVeterinaria.getNombre()}!`);

let finSucursales:boolean = false;
//Agrega la central como una sucursal
centralVeterinaria.nuevaSucursal(nombreVeterinaria,direccionVeterinaria);
while(finSucursales==false){
    console.log(`\n=========\nMENU CENTRAL\n=========\n`);    
    centralVeterinaria.listarSucursales();
    console.log(`0 - Crear sucursal \n-1 - Para finalizar`);    
    let opcionSucursal:number = readLineSync.questionInt('Ingrese el Numero de Sucursal o la opcion deseada: ');
    if(opcionSucursal == 0){
        //Crea sucursal
        let nombreSucursal: string;
        do {
            nombreSucursal = readLineSync.question('Ingrese el nombre de la sucursal: ');
        } while (!nombreSucursal.trim());
        let direccionSucursal:string;
        do {
            direccionSucursal = readLineSync.question('Ingrese la direccion de la sucursal: ');
        } while (!direccionSucursal.trim());
        //Crea la sucursal
        centralVeterinaria.nuevaSucursal(nombreSucursal,direccionSucursal);
    }else if(opcionSucursal==-1){
        finSucursales = true;
    }else{
        //Busca la sucursal
        let nombreSucursal:string = centralVeterinaria.seleccionarSucursal(opcionSucursal);
        if(nombreSucursal!=""){
            console.log(`\n------------`);
            console.log(`Bienvenid@ a la sucursal ${nombreSucursal}.`);
            //Acciones dentro de la Sucursal seleccionada
            let finMenuSucursal:boolean=false;
            while (finMenuSucursal==false) {
                console.log(`\n=========\nMENU SUCURSALES\n=========`);    
                console.log(`\nOpciones:\n 1 - Modificar nombre sucursal\n 2 - Modificar dirección sucursal\n 3 - Eliminar sucursal\n 4 - Listar clientes\n 5 - Listar proveedores\n -1 - Volver al listado de sucursales.`);
                let opcionMenuSucursal:number= readLineSync.questionInt('Ingrese el numero de la opcion: ');  
                if(0<opcionMenuSucursal && opcionMenuSucursal<6){
                    //Opciones dentro de sucursal
                    switch (opcionMenuSucursal) {
                        case 1: //Modificar nombre sucursal
                            let nuevoNombre: string;
                            do {
                                nuevoNombre = readLineSync.question('Ingrese el nuevo nombre de la sucursal: ');
                            } while (!nuevoNombre.trim());
                            centralVeterinaria.modificarNombreSucursal(nombreSucursal,nuevoNombre);
                            nombreSucursal=nuevoNombre;
                            break;
                        case 2: //Modificar dirección sucursal
                            let nuevaDireccion: string;
                            do {
                                nuevaDireccion = readLineSync.question('Ingrese la nueva direccion: ');
                            } while (!nuevaDireccion.trim());
                            centralVeterinaria.modificarDireccionSucursal(nombreSucursal,nuevaDireccion);
                            break;
                        case 3: //Eliminar sucursal
                            let confirmacionEliminar:string;
                            do {
                                confirmacionEliminar = readLineSync.question(`Esta seguro que desea eliminar la sucursal ${nombreSucursal}? [S/N]: `);
                            } while (confirmacionEliminar.toUpperCase()!="S" && confirmacionEliminar.toUpperCase()!="N");
                            if(confirmacionEliminar.toUpperCase()=="S"){
                                //elimina la sucursal
                                centralVeterinaria.eliminarSucursal(nombreSucursal);
                                finMenuSucursal = true;
                            }else{
                                console.log(`Ha cancelado la eliminación de la sucursal.`);                                
                            }
                            break;
                        case 4: //Listar clientes
                            //Acciones dentro del menú de clientes
                            let finMenuCliente:boolean=false;
                            let sucursalSeleccionada = centralVeterinaria.returnSucursal(nombreSucursal);
                            while (finMenuCliente==false) {
                                console.log(`\n=========\nMENU CLIENTES\n=========`);    
                                console.log(`\n------------`);
                                sucursalSeleccionada.listarClientes();
                                console.log(`0 - Crear cliente \n-1 - Volver al menú anterior`);    
                                let opcionClientes:number = readLineSync.questionInt('Ingrese el Numero de Cliente o la opcion deseada: ');
                                if(opcionClientes == 0){
                                    //Crea el cliente
                                    let nombreCliente: string;
                                    do {
                                        nombreCliente = readLineSync.question('Ingrese el nombre del cliente: ');
                                    } while (!nombreCliente.trim());
                                    let telCliente = readLineSync.questionInt('Ingrese el telefono del cliente (solo numeros): ');
                                    sucursalSeleccionada.nuevoCliente(nombreCliente,telCliente);
                                }else if(opcionClientes == -1){
                                    // vuelve al menu anterior
                                    finMenuCliente=true;
                                }else{
                                    //selecciona el cliente
                                    let nombreCliente: string = sucursalSeleccionada.seleccionarCliente(opcionClientes);
                                    if(nombreCliente!=""){
                                        //Encontró el cliente
                                        let clienteSeleccionado = sucursalSeleccionada.returnCliente(nombreCliente);
                                        let esVip:string;
                                        if(clienteSeleccionado.getVip()>=5){
                                            esVip = "VIP";
                                        }else{
                                            esVip = "NO VIP";
                                        }
                                        console.log(`\n${clienteSeleccionado.getNombre()} - Tel: ${clienteSeleccionado.getTelefono()} - Cliente ${esVip}`);  
                                        //Menu interno del cliente
                                        let menuInternoCliente:boolean = false;
                                        while (menuInternoCliente == false) {
                                            console.log(`\n=========\nMENU INTERNO CLIENTE\n=========`);    
                                            console.log(`\nOpciones:\n 1 - Modificar nombre cliente\n 2 - Modificar teléfono cliente\n 3 - Eliminar cliente\n 4 - Listar mascotas\n 5 - Agregar consulta\n 6 - Vender producto\n -1 - Volver al menú anterior`);
                                            let opcionMenuCliente:number= readLineSync.questionInt('Ingrese el numero de la opcion: ');  
                                            if(0<opcionMenuCliente && opcionMenuCliente<7){
                                                //Opciones dentro del cliente
                                                switch (opcionMenuCliente) {
                                                    case 1: // Modificar nombre cliente
                                                        let nuevoNombre: string;
                                                        do {
                                                            nuevoNombre = readLineSync.question('Ingrese el nuevo nombre del cliente: ');
                                                        } while (!nuevoNombre.trim());
                                                        sucursalSeleccionada.modificarNombreCliente(clienteSeleccionado.getNombre(),nuevoNombre);
                                                        nombreCliente=nuevoNombre;
                                                        break;
                                                    case 2: // Modificar tel cliente
                                                        let nuevoTel:number = readLineSync.questionInt(`Ingrese el nuevo telefono (solo numeros): `);
                                                        sucursalSeleccionada.modificarTelefonoCliente(clienteSeleccionado.getNombre(),nuevoTel);
                                                        break;
                                                    case 3: // Eliminar cliente
                                                        let confirmacionEliminar:string;
                                                        do {
                                                            confirmacionEliminar = readLineSync.question(`Esta seguro que desea eliminar el cliente ${nombreCliente}? [S/N]: `);
                                                        } while (confirmacionEliminar.toUpperCase()!="S" && confirmacionEliminar.toUpperCase()!="N");
                                                        if(confirmacionEliminar.toUpperCase()=="S"){
                                                            //elimina el cliente
                                                            sucursalSeleccionada.eliminarCliente(nombreCliente);
                                                            menuInternoCliente = true;
                                                        }else{
                                                            console.log(`Ha cancelado la eliminación del cliente.`);                                
                                                        }
                                                        break;
                                                    case 4: // Listar mascotas
                                                        //Acciones dentro del menú de mascotas
                                                        let finMenuMascota:boolean=false;
                                                        while (finMenuMascota==false) {
                                                            console.log(`\n=========\nMENU MASCOTAS\n=========`);    
                                                            console.log(`\n------------`);
                                                            clienteSeleccionado.getMascotas();
                                                            console.log(`0 - Crear mascota\n-1 - Volver al menú anterior`);    
                                                            let opcionMascotas:number = readLineSync.questionInt('Ingrese el Numero de la mascota o la opcion deseada: ');
                                                            if(opcionMascotas == 0){
                                                                //Crear masctoca  nombre, especie, idcliente, obs?
                                                                let nombreMascota: string;
                                                                do {
                                                                    nombreMascota = readLineSync.question('Ingrese el nombre de la mascota: ');
                                                                } while (!nombreMascota.trim());
                                                                console.log(`Seleccione la opción de su especie:\n 1 - Perro\n 2 - Gato\n 3 - Exótica`);
                                                                let opcionEspecie:number = readLineSync.questionInt('Ingrese la opcion: ');
                                                                let especie:string;
                                                                switch (opcionEspecie) {
                                                                    case 1:
                                                                        especie="Perro"
                                                                        break;
                                                                    case 2:
                                                                        especie="Gato"
                                                                        break;
                                                                    default:
                                                                        especie="Exótica"
                                                                        break;
                                                                }
                                                                let observacion:string = readLineSync.question(`Observacion (ej: detalle de especie exotica): `);
                                                                clienteSeleccionado.agregarMascota(nombreMascota,especie,clienteSeleccionado.getId(),observacion);
                                                            }else if(opcionMascotas == -1){
                                                                //Volver al menu anterior
                                                                finMenuMascota=true;
                                                            }else{
                                                                //Selecciona la mascota
                                                                let nombreMascota: string = clienteSeleccionado.seleccionarPaciente(opcionMascotas);
                                                                if(nombreMascota!=""){
                                                                    //Encontró la mascota
                                                                    let mascotaSeleccionada = clienteSeleccionado.returnPaciente(nombreMascota);
                                                                    console.log(`\n${mascotaSeleccionada.getNombre()} - Especie: ${mascotaSeleccionada.getEspecie()} - Observación: ${mascotaSeleccionada.getObservacion()}`);  
                                                                    //Menu interno de la mascota
                                                                    let menuInternoMascota:boolean = false;
                                                                    while (menuInternoMascota == false) {
                                                                        console.log(`\n=========\nMENU INTERNO MASCOTA\n=========`);    
                                                                        console.log(`\nOpciones:\n 1 - Modificar nombre mascota\n 2 - Modificar especie\n 3 - Modificar observación\n 4 - Eliminar mascota\n -1 - Volver al menú anterior`);
                                                                        let opcionMenuMascota:number= readLineSync.questionInt('Ingrese el numero de la opcion: ');  
                                                                        if(0<opcionMenuMascota && opcionMenuMascota<5){
                                                                            //Opciones dentro de la mascota
                                                                            switch (opcionMenuMascota) {
                                                                                case 1: // Modificar nombre mascota
                                                                                    let nuevoNombre: string;
                                                                                    do {
                                                                                        nuevoNombre = readLineSync.question('Ingrese el nuevo nombre de la mascota: ');
                                                                                    } while (!nuevoNombre.trim());
                                                                                    clienteSeleccionado.modificarNombreMascota(nombreMascota,nuevoNombre);
                                                                                    nombreMascota=nuevoNombre;
                                                                                    break;
                                                                                case 2: // Modificar especie
                                                                                    console.log(`Seleccione la opción de su nueva especie:\n 1 - Perro\n 2 - Gato\n 3 - Exótica`);
                                                                                    let opcionEspecie:number = readLineSync.questionInt('Ingrese la opcion: ');
                                                                                    let nuevaEspecie:string;
                                                                                    switch (opcionEspecie) {
                                                                                        case 1:
                                                                                            nuevaEspecie="Perro"
                                                                                            break;
                                                                                        case 2:
                                                                                            nuevaEspecie="Gato"
                                                                                            break;
                                                                                        default:
                                                                                            nuevaEspecie="Exótica"
                                                                                            break;
                                                                                    }
                                                                                    clienteSeleccionado.modificarEspecieMascota(nombreMascota,nuevaEspecie);
                                                                                    break;
                                                                                case 3: // Modificar observacion
                                                                                    let nuevaObs:string = readLineSync.question(`Ingrese la nueva observacion: `);
                                                                                    clienteSeleccionado.modificarObservacionMascota(nombreMascota,nuevaObs);
                                                                                    break;
                                                                                case 4: // Eliminar mascota
                                                                                    let confirmacionEliminar:string;
                                                                                    do {
                                                                                        confirmacionEliminar = readLineSync.question(`Esta seguro que desea eliminar la mascota ${nombreMascota}? [S/N]: `);
                                                                                    } while (confirmacionEliminar.toUpperCase()!="S" && confirmacionEliminar.toUpperCase()!="N");
                                                                                    if(confirmacionEliminar.toUpperCase()=="S"){
                                                                                        //elimina la mascota
                                                                                        clienteSeleccionado.eliminarMascota(nombreMascota);
                                                                                        menuInternoMascota = true;
                                                                                    }else{
                                                                                        console.log(`Ha cancelado la eliminación de la mascota.`);                                
                                                                                    }
                                                                                    break;
                                                                            }
                                                                        }else if(opcionMenuMascota==-1){
                                                                            //Volver al menu anterior
                                                                            menuInternoMascota=true;
                                                                        }else{
                                                                            console.log(`Opción inválida.`);
                                                                        }
                                                                    }
                                                                }else{
                                                                    //No encontró la mascota
                                                                    console.log(`La mascota ${opcionMascotas} no existe.`);
                                                                }  
                                                            }
                                                        }
                                                        break;
                                                    case 5: // Agregar consulta
                                                        console.log(`Ha agregado una consulta al cliente.`);
                                                        clienteSeleccionado.altaConsulta();
                                                        break;
                                                    case 6: // Vender producto
                                                        let nombreVenderProducto: string;
                                                        do {
                                                            nombreVenderProducto = readLineSync.question('Ingrese el nombre del producto que desea vender: ');
                                                        } while (!nombreVenderProducto.trim());
                                                        let cantidadAVender:number=readLineSync.questionInt(`Ingrese la cantidad de ${nombreVenderProducto} que desea vender: `);
                                                        sucursalSeleccionada.venderProducto(nombreVenderProducto,cantidadAVender);
                                                        break;
                                                }
                                            }else if(opcionMenuCliente==-1){
                                                //Vuelve al menu anterior
                                                menuInternoCliente = true;
                                            }else{
                                                //Opción inválida
                                                console.log(`La opción ingresada es inválida.`);                    
                                            }
                                        }
                                    }else{
                                        //No encontró cliente
                                        console.log(`El cliente ${opcionClientes} no existe.`);
                                    }  
                                }
                            }
                            break;
                        case 5: //Listar proveedores
                            //Acciones dentro del menú de proveedores
                            let finMenuProveedor:boolean=false;
                            let sucursalSeleccionadaProv = centralVeterinaria.returnSucursal(nombreSucursal);
                            while (finMenuProveedor==false) {
                                console.log(`\n=========\nMENU PROVEEDORES\n=========`);    
                                console.log(`\n------------`);
                                sucursalSeleccionadaProv.listarProveedores();
                                console.log(`0 - Crear proveedor\n-1 - Volver al menú anterior`);    
                                let opcionProveedor:number = readLineSync.questionInt('Ingrese el Numero de Proveedor o la opcion deseada: ');
                                if(opcionProveedor == 0){
                                    //Crea el proveedor
                                    let nombreProveedor: string;
                                    do {
                                        nombreProveedor = readLineSync.question('Ingrese el nombre del proveedor: ');
                                    } while (!nombreProveedor.trim());
                                    let telProveedor = readLineSync.questionInt('Ingrese el telefono del proveedor (solo numeros): ');
                                    sucursalSeleccionadaProv.nuevoProveedor(nombreProveedor,telProveedor);
                                }else if(opcionProveedor == -1){
                                    // vuelve al menu anterior
                                    finMenuProveedor=true;
                                }else{
                                    //selecciona el proveedor
                                    let nombreProveedor: string = sucursalSeleccionadaProv.seleccionarProveedor(opcionProveedor);
                                    if(nombreProveedor!=""){
                                        //Encontró el proveedor
                                        let proveedorSeleccionado = sucursalSeleccionadaProv.returnProveedor(nombreProveedor);
                                        
                                        console.log(`\n${proveedorSeleccionado.getNombre()} - Tel: ${proveedorSeleccionado.getTelefono()}`);  
                                        //Menu interno del proveedor
                                        let menuInternoProveedor:boolean = false;
                                        while (menuInternoProveedor == false) {
                                            console.log(`\n=========\nMENU INTERNO PROVEEDOR\n=========`);    
                                            console.log(`\nOpciones:\n 1 - Modificar nombre proveedor\n 2 - Modificar teléfono proveedor\n 3 - Eliminar proveedor\n 4 - Listar productos\n -1 - Volver al menú anterior`);
                                            let opcionMenuProveedor:number= readLineSync.questionInt('Ingrese el numero de la opcion: ');  
                                            if(0<opcionMenuProveedor && opcionMenuProveedor<5){
                                                //Opciones dentro del proveedor
                                                switch (opcionMenuProveedor) {
                                                    case 1: // Modificar nombre proveedor
                                                        let nuevoNombre: string;
                                                        do {
                                                            nuevoNombre = readLineSync.question(`Ingrese el nuevo nombre del proveedor: `);
                                                        } while (!nuevoNombre.trim());
                                                        sucursalSeleccionadaProv.modificarNombreProveedor(proveedorSeleccionado.getNombre(),nuevoNombre);
                                                        nombreProveedor=nuevoNombre;
                                                        break;
                                                    case 2: // Modificar tel proveedor
                                                        let nuevoTel:number = readLineSync.questionInt(`Ingrese el nuevo telefono (solo numeros): `);
                                                        sucursalSeleccionadaProv.modificarTelefonoProveedor(proveedorSeleccionado.getNombre(),nuevoTel);
                                                        break;
                                                    case 3: // Eliminar proveedor
                                                        let confirmacionEliminar:string;
                                                        do {
                                                            confirmacionEliminar = readLineSync.question(`Esta seguro que desea eliminar al proveedor ${nombreProveedor}? [S/N]: `);
                                                        } while (confirmacionEliminar.toUpperCase()!="S" && confirmacionEliminar.toUpperCase()!="N");
                                                        if(confirmacionEliminar.toUpperCase()=="S"){
                                                            //Elimina el proveedor
                                                            sucursalSeleccionadaProv.eliminarProveedor(nombreProveedor);
                                                            menuInternoProveedor = true;
                                                        }else{
                                                            console.log(`Ha cancelado la eliminación del proveedor.`);                                
                                                        }
                                                        break;
                                                    case 4: // Listar productos
                                                        //Acciones dentro del menú de productos
                                                        let finMenuProductosProv:boolean=false;
                                                        while (finMenuProductosProv==false) {
                                                            console.log(`\n=========\nMENU PRODUCTOS\n=========`);    
                                                            console.log(`\n------------`);
                                                            proveedorSeleccionado.listarProductos();
                                                            console.log(`\n------------`);
                                                            console.log(` 0 - Crear producto\n 1 - Eliminar producto\n 2 - Comprar producto\n -1 - Volver al menú anterior`);    
                                                            let opcionProductos:number = readLineSync.questionInt('Ingrese el Numero de la opcion: ');
                                                            switch (opcionProductos) {
                                                                case 0:
                                                                    //Crear producto
                                                                    let nombreProducto: string;
                                                                    do {
                                                                        nombreProducto = readLineSync.question('Ingrese el nombre del producto: ');
                                                                    } while (!nombreProducto.trim());
                                                                    proveedorSeleccionado.setProducto(nombreProducto);
                                                                    break;
                                                                case 1:
                                                                    //Eliminar producto
                                                                    let nombreEliminarProducto: string;
                                                                    do {
                                                                        nombreEliminarProducto = readLineSync.question('Ingrese el nombre del producto que desea eliminar: ');
                                                                    } while (!nombreEliminarProducto.trim());

                                                                    let confirmacionEliminar:string;
                                                                    do {
                                                                        confirmacionEliminar = readLineSync.question(`Esta seguro que desea eliminar el producto ${nombreEliminarProducto}? [S/N]: `);
                                                                    } while (confirmacionEliminar.toUpperCase()!="S" && confirmacionEliminar.toUpperCase()!="N");
                                                                    if(confirmacionEliminar.toUpperCase()=="S"){
                                                                        //elimina el producto
                                                                        proveedorSeleccionado.eliminarProducto(nombreEliminarProducto);
                                                                        finMenuProductosProv = true;
                                                                    }else{
                                                                        console.log(`Ha cancelado la eliminación del producto.`);                                
                                                                    }
                                                                    break;
                                                                case 2:
                                                                    //Comprar producto
                                                                    let nombreComprarProducto: string;
                                                                    do {
                                                                        nombreComprarProducto = readLineSync.question('Ingrese el nombre del producto que desea comprar: ');
                                                                    } while (!nombreComprarProducto.trim());
                                                                    let cantidadAComprar:number=readLineSync.questionInt(`Ingrese la cantidad de ${nombreComprarProducto} que desea comprar: `);
                                                                    proveedorSeleccionado.comprarProducto(nombreComprarProducto,cantidadAComprar);
                                                                    break;
                                                                case -1:
                                                                    //Volver al menu anterior
                                                                    finMenuProductosProv=true;
                                                                    break;
                                                                default:
                                                                    console.log(`Opción inválida.`);                                                                    
                                                                    break;
                                                            }
                                                        }
                                                        break;                                            
                                                }
                                            }else if(opcionMenuProveedor==-1){
                                                //Vuelve al menu anterior
                                                menuInternoProveedor = true;
                                            }else{
                                                //Opción inválida
                                                console.log(`La opción ingresada es inválida.`);                    
                                            }
                                        }                                       
                                    }else{
                                        //No encontró proveedor
                                        console.log(`El proveedor ${opcionProveedor} no existe.`);
                                    }  
                                }
                            }
                            break;
                    }
                }else if(opcionMenuSucursal==-1){
                    //Vuelve al menu anterior
                    finMenuSucursal = true;
                }else{
                    //Opción inválida
                    console.log(`La opción ingresada es inválida.`);                    
                }
            }            
        }else{
            //No encontró sucursal
            console.log(`La sucursal ${opcionSucursal} no existe.`);
            console.log(`\n------------`);
        }        
    }    
}
console.log(`\n\n\n------------`);
console.log(`Gracias por utilizar nuestro sistema.`);


