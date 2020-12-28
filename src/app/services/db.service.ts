import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map,  } from 'rxjs/operators';
import { Film } from '../models/film.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  database = firebase.database();

  readonly filmsPath = 'Films/';

  readonly usersPath = 'Users/';

  lastId:number;

  films$:Observable<Film[]> = this.db.list<Film>(this.filmsPath).valueChanges();

  constructor(public db: AngularFireDatabase, public authService:AuthService) {

    this.getLastIndex()

  
    this.authService.user.subscribe(async x => {
      console.log('cambio');
      if(x != null){
        console.log('cambio222: ', x.uid);
        this.checkNewUser2();
        
      
      }else{
        console.log('NULL');
      }
    })

  }

  /* This method checks everytime an user logs in (as it's used in loginGoogle() method) if it's uid is registered in the database:
      - If registered: Does nothing.
      - If not registered: Means is his first log in so it's created a new record with a model JSON (newRecordModel)
  */
  checkNewUser2() {
    // Path where users records are located in the db
    const path = 'Users/';

    let uid = this.authService.uid;

    // Model JSON to assign to the new user (if first time login) db record
    const newRecordModel = {
      favList: {
      },
      titleFavList: 'Favoritas'
    }

    // Method execute when 'value' events occurs. Search the actual user uid in the db. If it exists nothing happens, if not it's created a new record.
    this.database.ref(path + uid).on('value',
    (queryOk) => {
      console.log('Query completed', queryOk.val());
      if (queryOk.val() == undefined) {
        console.log('Creating new user in DB');
        // this.db.object(path + uid).update(newRecordModel);
        this.database.ref(path + uid).update(newRecordModel);
      } else {
        console.log('User already exists');
      }
    },
    (queryErr) => console.log('Query error: ', queryErr));
  }

  getLastIndex(){
    this.db.list<Film>(this.filmsPath).valueChanges().subscribe(x => {this.lastId = x.sort( (a, b) => a.id - b.id)[x.length - 1].id; console.log(this.lastId)});
  }

  removeFav(id:number){
    this.database.ref(this.usersPath + this.authService.uid + '/favList/' + id).remove();
    // this.db.object(this.usersPath + this.authService.uid + '/favList/' + id).remove();
  }

  addFav(id:number){
    this.database.ref(this.usersPath + this.authService.uid + '/favList/' + id).push(id);
  }

  onFavAdded(callback){
    this.database.ref(this.usersPath + this.authService.uid + '/favList/').on('child_added', callback);
  }

  onFavRemoved(callback){
    this.database.ref(this.usersPath + this.authService.uid + '/favList/').on('child_removed', callback);
  }

  addFilm(title:string, ref:string){
    this.database.ref(this.filmsPath + (this.lastId + 1)).set({title: title, id: (this.lastId + 1), cartel_ref: ref});
  }

  removeFilm(id: number) {
    this.database.ref(this.filmsPath + id).remove();
    this.database.ref(this.usersPath + this.authService.uid + '/favList/' + id).remove();
  }

}