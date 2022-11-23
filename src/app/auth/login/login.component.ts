import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!:FormGroup;
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
  
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.storeSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
      console.log('cargando subs')
    })
  }

  iniciarSesion(){

    if( this.loginForm.invalid ) return;

    this.store.dispatch( ui.isLoading() )

    const { email, password } = this.loginForm.value;

    this.authService.iniciarSesion(email, password)
    .then(credenciales => {
      this.store.dispatch( ui.stopLoading() )
      this.router.navigateByUrl('/')
    })
    .catch(err => {
      this.store.dispatch( ui.stopLoading() );
      console.error(err);
    })
  }
}
