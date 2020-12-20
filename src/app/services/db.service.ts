import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
// import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(public db: AngularFireDatabase) { }

  /*This method checks everytime an user logs in (as it's used in loginGoogle() method) if it's uid is registered in the database:
    - If registered: Does nothing.
    - If not registered: Means is his first log in so it's created a new record with a model JSON (newRecordModel)
  */
  checkNewUser(uid:string){

    //Path where users records are located in the db
    const path = 'Users/';

    //Model JSON to assign to the new user (if first time login) db record
    const newRecordModel = {
      favList: [
        "prueba"
      ],
      titleFavList: 'Favoritas'
    }

    //Empty Observable
    let dbObjectValue$ = new Observable<any>();

    //Fill "dbObjectValue$" with the Observable that its returned from the db.object() method
    dbObjectValue$ = this.db.object(path + uid).valueChanges();
    
    dbObjectValue$.subscribe( e => {
      console.log('dbObjectValue: ', e);
      if (e == undefined) {
        console.log("Creando nuevo user en BBDD");
        this.db.object(path + uid).update(newRecordModel);
      } else {
        console.log("User ya existente");
      }
    });
  }

  checkNewUser2(uid:string) {
    //Path where users records are located in the db
    const path = 'Users/';

    //Model JSON to assign to the new user (if first time login) db record
    const newRecordModel = {
      favList: [
        "prueba"
      ],
      titleFavList: 'Favoritas'
    }

    this.db.object(path + uid).query.on('value',
    (queryOk) => {
      console.log('Query completed', queryOk.val());
      if (queryOk.val() == undefined) {
        console.log('Creating new user in DB');
        this.db.object(path + uid).update(newRecordModel);
      } else {
        console.log('User already exists');
      }
    },
    (queryErr) => console.log('Query error: ', queryErr));
  }

  getUserFavListObservable(uid:string){
    let dbObjectValue$ = new Observable<any>();

    const path = 'Users/';

    // let filmList:string[];

    //Fill "dbObjectValue$" with the Observable that its returned from the db.object() method
    // this.db.object(path + uid + '/favList').valueChanges().forEach(e => [...filmList]).then( e => {console.log('e8: ', e);
    // console.log('filmList44: ',filmList)});
    
    dbObjectValue$ = this.db.list(path + uid + '/favList').valueChanges();
    
    return dbObjectValue$;
  }

  getFilms(obv: Observable<any>){

    let filmList:string[];

    

    obv.subscribe(e => {
        e.forEach(element => {
          console.log(element);
          this.db.object('Films/' + element).valueChanges().subscribe( e => console.log(e))
        });
      }
    );

    // filmList.forEach(element => {
    //   console.log(this.db.object('Films/' + element).valueChanges());
    // });

  }

  asd(data) {
    console.log(data.val());
  }

  hhh() {

    // firebase.database().ref('Films/').on('value', this.asd);
    // firebase.database().ref('Films/undefined/').remove();

    console.log('as: ', this.db.object('Films/').query.on('value', this.asd));

    // let ff;

    // const x = this.db.object('FilmLists/DefaultThriller').valueChanges().subscribe( x => ff = x);

    // this.db.object('Films/' + ff).valueChanges().subscribe( cc => console.log(cc) );

    
  }
  
}
