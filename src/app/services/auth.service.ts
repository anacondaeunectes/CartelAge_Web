import { AfterContentInit, AfterViewInit, Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';
import { Film } from '../models/film.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  authState = null;

  uid:string;

  constructor(public auth: AngularFireAuth/*, public dbService:DbService*/) { 
    console.log('Desde constructor de AuthService');
  }

  user = this.auth.authState.pipe( map( authState => {
      console.log('authState3: ', authState);
      if(authState){
        console.log('pop')
        this.authState = authState;
        this.uid = authState.uid;
        return authState;
      }else{
        this.authState = null;
        return null;
      }
  }))

  //Allows to log in with a Google account. Also calls checkNewUser(user) method everytime an user successfully logs in.
  loginGoogle() {
    this.auth.signInWithPopup( new auth.GoogleAuthProvider())
    .then( signIn => {
      console.log('Usuario logado: ', signIn);
      // this.dbService.checkNewUser2(signIn.user.uid);
    })
    .catch( signIn => console.error('Error en el login: ' + signIn));
  }

  //Allows to log out so 'authState' property becomes null 
  logout() {
    this.auth.signOut()
    .then( signOutAction => console.log('Sesion cerrada exitosamente: ', signOutAction))
    .catch( singOutAction => console.log('Error al cerrar sesión: ', singOutAction));
  }
}
