import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Film } from '../models/film.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  //Firebase database object
  database = firebase.database();

  //Database paths
  readonly filmsPath = 'Films/';
  readonly usersPath = 'Users/';

  lastId:number;

  //Observable to get database films value (from AngularFire)
  films$:Observable<Film[]> = this.db.list<Film>(this.filmsPath).valueChanges();

  constructor(public db: AngularFireDatabase, public authService:AuthService) {

    this.getLastIndex()

  
    this.authService.user.subscribe(async x => {
      console.log('User switched');
      if(x != null){
        this.checkNewUser2();
      }
    })

  }
   /* This method checks everytime an user logs in (as it's used in user state subscription) if it's uid is registered in the database:
      - If registered: Does nothing.
      - If not registered: Means is his first log in so it's created a new record with a model JSON (newRecordModel)
  */
  checkNewUser2() {

    let uid = this.authService.uid;

    // Model JSON to assign to the new user (if first time login) db record
    const newRecordModel = {
      favList: {},
      titleFavList: 'Favoritas'
    }

    // Method execute when 'value' events occurs. Search the actual user uid in the db. If it exists nothing happens, if not it's created a new record.
    this.database.ref(this.usersPath + uid).on('value',
    (queryOk) => {
      if (queryOk.val() == undefined) {
        console.log('Creating new user in DB');
        // this.db.object(path + uid).update(newRecordModel);
        this.database.ref(this.usersPath + uid).update(newRecordModel);
      } else {
        console.log('User already exists');
      }
    },
    (queryErr) => console.log('Query error: ', queryErr));
  }

  //This method get lasy id from database films folder
  getLastIndex(){
    this.db.list<Film>(this.filmsPath).valueChanges().subscribe(x => {
      this.lastId = x.sort( (a, b) => a.id - b.id)[x.length - 1].id
    });
  }

  //Remove film from user favList
  removeFav(id:number){
    this.database.ref(this.usersPath + this.authService.uid + '/favList/' + id).remove();
  }
  //Add a film to user favList
  addFav(id:number){
    this.database.ref(this.usersPath + this.authService.uid + '/favList/' + id).push(id);
  }

  //Executes callback function paramater every time a chilf is added to user favList
  onFavAdded(callback){
    this.database.ref(this.usersPath + this.authService.uid + '/favList/').on('child_added', callback);
  }

  //Executes callback function paramater every time a chilf is removec to user favList
  onFavRemoved(callback){
    this.database.ref(this.usersPath + this.authService.uid + '/favList/').on('child_removed', callback);
  }

  //Add film to database
  addFilm(title:string, ref:string){
    this.database.ref(this.filmsPath + (this.lastId + 1)).set({title: title, id: (this.lastId + 1), cartel_ref: ref});
  }

  //Remove film from database. Also remove it from user's favList 
  removeFilm(id: number) {
    this.database.ref(this.filmsPath + id).remove();
    this.database.ref(this.usersPath + this.authService.uid + '/favList/' + id).remove();
  }

}