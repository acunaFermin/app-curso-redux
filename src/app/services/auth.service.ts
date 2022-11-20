import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public fireAuth: AngularFireAuth
  ) { }


  crearUsuario( nombre:string, email:string, password:string ){
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
  }
  
  iniciarSesion( email:string, password:string ){
    return this.fireAuth.signInWithEmailAndPassword(email, password)
  }

  cerrarSesion(){
    return this.fireAuth.signOut();
  }
}
