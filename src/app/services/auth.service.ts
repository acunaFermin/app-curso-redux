import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Usuario } from '../models/usuario.models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public fireAuth: AngularFireAuth,
    public fireStore: AngularFirestore,
    private router: Router
  ) { }

  initAuthListener(){
    this.fireAuth.authState.subscribe(fuser => {
      console.log({
        1: fuser?.email,
        2: fuser?.displayName,
        3: fuser?.uid
      })
    })
  }

  crearUsuario( nombre:string, email:string, password:string ){
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
            .then( ({user}) => {
              const newUser = new Usuario( user?.uid!, nombre, user?.email! );

              return this.fireStore.doc(`${user?.uid}/usuario`)
              .set({...newUser})
            })
  }
  
  iniciarSesion( email:string, password:string ){
    return this.fireAuth.signInWithEmailAndPassword(email, password)
  }

  cerrarSesion(){
    return this.fireAuth.signOut();
  }

  isAuth(){
    return this.fireAuth.authState.pipe(
      map( fireUser => fireUser ? true : false ),
      tap( isAuth => {
        !isAuth ? this.router.navigateByUrl('/login') : null 
      })
    );
  }
}
