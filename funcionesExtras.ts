import * as rls from 'readline-sync';


export function validarTexto(mensaje):string{
    let inputText: string;
    do {
        inputText = rls.question(mensaje);
    } while (!inputText.trim());
    return inputText
}