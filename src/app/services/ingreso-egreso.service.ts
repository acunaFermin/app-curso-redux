import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';
import { IngresoEgresoUID } from '../ingreso-egreso/detalle/detalle.component';
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

    return this.fireStore.doc(`${ uid }/ingresos-egresos`)
        .collection('items')
        .add({ ...ingresoEgreso })
        .then(res => console.log('exito', res))
        .catch(err => console.warn('error', err))
  }
  
  initIngresosEgresosListener( uid:string ): Observable<IngresoEgresoUID[]> {
    return this.fireStore.collection(`${ uid }/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map( items => items.map( item => ({
        uid: item.payload.doc.id,
        ...item.payload.doc.data() as IngresoEgreso
      })))
    )
  }

  borrarItem(itemUID:string){
    let uid = this.authService.user.uid;
    
    return this.fireStore.doc(`${ uid }/ingresos-egresos/items/${ itemUID }`).delete();
  }

}
