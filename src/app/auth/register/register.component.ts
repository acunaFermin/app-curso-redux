import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup;

  constructor( 
    private fb:FormBuilder,
    private authService:AuthService,
    private router: Router
  ){}
  
  
  ngOnInit() {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    })

  }

  crearUsuario(){

    if( this.registroForm.invalid ) return

    const { nombre, correo, clave } = this.registroForm.value;

    this.authService.crearUsuario( nombre, correo, clave )
    .then( credenciales => {
      console.log( {credenciales} )
      this.router.navigateByUrl('/')
    })
    .catch(err => console.error(err))
  }
}
