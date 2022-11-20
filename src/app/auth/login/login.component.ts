import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router: Router
  ){}


  ngOnInit() {
  
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  iniciarSesion(){
    console.log(this.loginForm.value)

    const { email, password } = this.loginForm.value;

    this.authService.iniciarSesion(email, password)
    .then(credenciales => {
      this.router.navigateByUrl('/')
    })
    .catch(console.error)
  }
}
