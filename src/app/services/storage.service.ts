import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly imgPath = 'Carteles_Peliculas/';

  public storage = firebase.storage();

  constructor( public dbService:DbService, public authService: AuthService) { }

  /* This method search the url of an Firebase Storage image by it's reference */
  getImg(img_ref:string) {
    return this.storage.ref(img_ref).getDownloadURL();
  }

  /* This method upload an img to Firebase Storage */
  uploadImg(ref:string, img){
    this.storage.ref(ref).put(img);
  }
  
}
