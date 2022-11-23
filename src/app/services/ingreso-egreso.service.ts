import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, tap } from 'rxjs';
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
  
  initIngresosEgresosListener( uid:string ){
    return this.fireStore.collection(`${ uid }/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map( items => items.map( item => ({
        uid: item.payload.doc.id,
        ...item.payload.doc.data() as IngresoEgreso
      })))
    )
  }

}
