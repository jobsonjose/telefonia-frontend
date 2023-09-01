import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'celularPipe'
})
export class CelularPipe implements PipeTransform {
    transform(valor: string) {
        if(!valor) {
            return "(00)00000-0000";
        }

        const valorTransformado = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        
        return valorTransformado;
    }
}