import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm!: FormGroup;
  cargando:boolean = false;
  storeSubscription!:Subscription;


  constructor( 
    private fb:FormBuilder,
    private authService:AuthService,
    private store: Store<AppState>,
    private router: Router
  ){}
  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
  
  
  ngOnInit() {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    })

    this.storeSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    })

  }

  crearUsuario(){

    if( this.registroForm.invalid ) return

    this.store.dispatch( ui.isLoading() )

    const { nombre, correo, clave } = this.registroForm.value;

    this.authService.crearUsuario( nombre, correo, clave )
    .then( credenciales => {
      this.store.dispatch( ui.stopLoading() )
      this.router.navigateByUrl('/')
    })
    .catch(err => {
      this.store.dispatch( ui.stopLoading() )
      console.error(err);
    })
  }
}
