import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.models';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as uiActions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnDestroy {

  mensaje: 'exito' | 'error' | null = null;
  tipo = 'ingreso';
  ingresoForm!:FormGroup;
  cargando: boolean = false;

  uiSubscription!: Subscription;

  constructor( 
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ){

    this.uiSubscription = this.store.select( 'ui' ).subscribe(ui => {
      this.cargando = ui.isLoading;
    })
  
  }
  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto:       ['', Validators.required],
    })
  }

  guardar(){

    if( this.ingresoForm.invalid ) return;
    this.mensaje = null;
    this.store.dispatch( uiActions.isLoading() );

    let { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo );

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
    .then(resp => {
      console.log('exito', resp);
      
      setTimeout(() => {
        this.ingresoForm.reset();
        this.mensaje = 'exito';
        this.store.dispatch( uiActions.stopLoading() );
      }, 1500);
    })
    .catch(err => {
      console.warn('err', err);
      this.mensaje = 'error';
      this.store.dispatch( uiActions.stopLoading() );
    })
  }
}
