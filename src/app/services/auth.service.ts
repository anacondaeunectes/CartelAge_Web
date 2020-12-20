import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, public dbService:DbService) { }

  // user = this.auth.authState.subscribe( authState => {
  //   console.log('authState: ', authState);
  //   if (authState) {
  //     console.log('nice');
  //     return authState;
  //   } else {
  //     return null;
  //   }
  // });

  //Buscar diferencia Pipe vs. Observable

  authState = null;

  user = this.auth.authState.pipe( map( authState => {
    console.log('authState3: ', authState);
    if(authState){
      this.authState = authState;
      return authState;
    }else{
      this.authState = null;
      return null;
    }
  }))

  test(){
    // this.dbService.getFilms(this.dbService.getUserFavListObservable(this.authState.uid));
    this.dbService.hhh();
  }

  //Allows to log in with a Google account. Also calls checkNewUser(user) method everytime an user successfully logs in.
  loginGoogle() {
    this.auth.signInWithPopup( new auth.GoogleAuthProvider())
    .then( signIn => {
      console.log('Usuario logado: ', signIn);
      this.dbService.checkNewUser2(signIn.user.uid);
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
