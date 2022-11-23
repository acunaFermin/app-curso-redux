import { Component, OnDestroy } from '@angular/core';

//ngrx
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  storeSubscription!: Subscription;

  constructor( 
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService, 
  ){
    
    this.storeSubscription = this.store.select('user')
    .pipe(
      filter( user => user.user !== null )
    )
    .subscribe(user => {
      this.ingresoEgresoService.initIngresosEgresosListener( user.user?.uid! )
    })
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
