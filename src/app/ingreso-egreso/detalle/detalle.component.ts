import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.models';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { AppStateWithIngresoEgr } from '../ingreso-egreso.reducer';

export interface IngresoEgresoUID extends IngresoEgreso {
  uid:string,
}[]
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnDestroy {

  ingresosEgresos:IngresoEgresoUID[] = [];
  storeSubs!:Subscription;

  constructor( 
    private store:Store<AppStateWithIngresoEgr>,
    private ingresoEgresoService: IngresoEgresoService 
  ){
    this.storeSubs = this.store.select('ingresoEgreso')
    .subscribe(({items}) => {
      this.ingresosEgresos = items;
    })  
  }
  ngOnDestroy() {
    this.storeSubs.unsubscribe();
  }

  borrar( uid: string ){
    this.ingresoEgresoService.borrarItem( uid )
    .then( res => console.log('exito', res) )
    .catch( res => console.warn('error', res) )
  }

}
