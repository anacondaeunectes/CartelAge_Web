import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public storage = firebase.storage();

  constructor( public dbService:DbService, public authService: AuthService) { }
  
  async getFavImgs():Promise<any[]>{
    let cc = await this.dbService.direct2(await this.dbService.direct(this.authService.authState.uid));
    let jh = await cc.map( x => this.storage.ref(x.cartel_ref).getDownloadURL());
    let yy = Promise.all(jh);

    await yy.then( c => c.forEach(x=> console.log('09: ', x)));

    return await yy;
    // let films = this.dbService.getFilms(this.dbService.getUserFavListPromise(this.authService.authState.uid));
    // films.forEach( c => console.log(this.storage.ref(c.cartel_ref).getDownloadURL()));
  }
  
}
