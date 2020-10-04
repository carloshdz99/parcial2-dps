import { AbstractControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

export class ValidarProductos {
    static validarCodigo(service:FirebaseService){
        return (control:AbstractControl) => {
            const codigo = control.value;
            return new Promise<any>((resolve, reject) => {
                return resolve(service.productos.find(x => x.codigo === codigo) ? null : {unique:true});
            });
        }
    }
}