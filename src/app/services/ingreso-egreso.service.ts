import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( 
    private fireStore: AngularFirestore,
    private authService: AuthService 
  ) { }


  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){

    let uid = this.authService.user.uid;
    console.log({uid})

    return this.fireStore.doc(`${ uid }/ingresos-egresos`)
        .collection('items')
        .add({ ...ingresoEgreso })
        .then(res => console.log('exito', res))
        .catch(err => console.warn('error', err))
  }


}
