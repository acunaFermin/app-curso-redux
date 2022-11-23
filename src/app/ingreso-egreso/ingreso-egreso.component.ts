import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.models';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent {

  mensaje: 'exito' | 'error' | null = null;
  tipo = 'ingreso';
  ingresoForm!:FormGroup;

  constructor( 
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService 
  ){}

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto:       ['', Validators.required],
    })
  }

  guardar(){

    if( this.ingresoForm.invalid ) return;

    console.log(this.ingresoForm.value)
    console.log(this.tipo)

    let { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo );

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
    .then(resp => {
      console.log('exito', resp);
      this.ingresoForm.reset();
      this.mensaje = 'exito';
    })
    .catch(err => {
      console.warn('err', err);
      this.mensaje = 'error';
    })
  }
}
