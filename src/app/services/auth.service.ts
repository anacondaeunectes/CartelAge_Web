import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  authState = null;

  uid:string;

  constructor(public auth: AngularFireAuth) { 
  }

  user = this.auth.authState.pipe( map( authState => {
      if(authState){
        this.authState = authState;
        this.uid = authState.uid;
        return authState;
      }else{
        this.authState = null;
        return null;
      }
  }))

  //Allows to log in with a Google account
  loginGoogle() {
    this.auth.signInWithPopup( new auth.GoogleAuthProvider())
    .catch( signIn => console.error('Error en el login: ' + signIn));
  }

  //Allows to log out so 'authState' property becomes null 
  logout() {
    this.auth.signOut()
    .then( signOutAction => console.log('Sesion cerrada exitosamente: ', signOutAction))
    .catch( singOutAction => console.log('Error al cerrar sesión: ', singOutAction));
  }
}
