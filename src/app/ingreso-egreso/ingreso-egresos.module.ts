import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoPipe } from '../pipes/ingreso-egreso.pipe';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

//ng-chart
import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';


@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    IngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NgChartsModule,
    ReactiveFormsModule,
    DashboardRoutesModule,
    StoreModule.forFeature( 'ingresoEgreso', ingresoEgresoReducer ),
  ]
})
export class IngresoEgresosModule { }
