import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable, Subscription, take, tap } from 'rxjs';
import { FirestoreUser, Usuario } from '../models/usuario.models';

//ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private _user!: Usuario;

  get user() {
    return {... this._user};
  }

  constructor(
    public fireAuth: AngularFireAuth,
    public fireStore: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) { }

  initAuthListener(){
    this.fireAuth.authState.subscribe(fuser => {
      console.log({fuser})
      if( fuser ){        
        //existe el usuario
        this.userSubscription = this.fireStore.doc<FirestoreUser>(`${fuser.uid}/usuario`).valueChanges()
        .subscribe( (fireStoreUser) => {

          const user = Usuario.fromFireStore( fireStoreUser! );
          this._user = user;
          this.store.dispatch( authActions.setUser({ user }) );

        } )
      }else{

        this.userSubscription?.unsubscribe();
        this.store.dispatch( authActions.unSetUser() );

      }
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
