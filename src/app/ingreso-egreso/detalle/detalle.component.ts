import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.models';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  storeSubs!:Subscription;

  constructor( private store:Store<AppState> ){
    this.storeSubs = this.store.select('ingresoEgreso').subscribe(({items}) => {
      this.ingresosEgresos = items;
    })  
  }
  ngOnDestroy() {
    this.storeSubs.unsubscribe();
  }

}
