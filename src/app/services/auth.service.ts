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

  // authentication = firebase.auth();

  // authenticationStatus = null;

  // authenticationUser = firebase.auth().onAuthStateChanged( user => {
  //   if (user) {
  //     console.log('lodddd: ', user);
  //     this.authenticationStatus = user;
  //   }
  // });

  // provider = new firebase.auth.GoogleAuthProvider;

  constructor(public auth: AngularFireAuth, public dbService:DbService) { 
    console.log('Desde constructor de AuthService');
  }
  


  user = this.auth.authState.pipe( map( authState => {
      console.log('authState3: ', authState);
      if(authState){
        console.log('pop')
        this.authState = authState;
        return authState;
      }else{
        this.authState = null;
        return null;
      }
  }))

  async test(){
    // this.dbService.getUserFavList(this.authState.uid).then( x => console.log(x.val()))
    // console.log(this.authenticationStatus.uid);
    // this.dbService.direct(this.authState.uid);
    // let ff = await this.dbService.direct(this.authState.uid);
    // console.log('00: ', await this.dbService.direct(this.authState.uid))
    // console.log(await this.dbService.direct2(await this.dbService.direct(this.authState.uid)));

    let cc = await this.dbService.direct2(await this.dbService.direct(this.authState.uid))
    // await cc.forEach( x => console.log(this.storage.ref(x.cartel_ref).getDownloadURL()));
    // await cc.forEach( x => console.log('p: ', x));
    console.log(await cc);
    // console.log( 'asd: ', ff.val());
  }

  //Allows to log in with a Google account. Also calls checkNewUser(user) method everytime an user successfully logs in.
  loginGoogle() {
    // this.authentication.signInWithPopup(this.provider)
    // .then( signIn => {
    //   console.log('Usuario logado: ', signIn);
    //   this.dbService.checkNewUser2(signIn.user.uid);
    // })
    // .catch( signIn => console.error('Error en el login: ' + signIn));

    this.auth.signInWithPopup( new auth.GoogleAuthProvider())
    .then( signIn => {
      console.log('Usuario logado: ', signIn);
      this.dbService.checkNewUser2(signIn.user.uid);
    })
    .catch( signIn => console.error('Error en el login: ' + signIn));
  }

  //Allows to log out so 'authState' property becomes null 
  logout() {
    // this.authentication.signOut()
    // .then( signOutAction => console.log('Sesion cerrada exitosamente: ', signOutAction))
    // .catch( singOutAction => console.log('Error al cerrar sesión: ', singOutAction));

    this.auth.signOut()
    .then( signOutAction => console.log('Sesion cerrada exitosamente: ', signOutAction))
    .catch( singOutAction => console.log('Error al cerrar sesión: ', singOutAction));
  }
}
