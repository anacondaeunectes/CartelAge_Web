import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  database = firebase.database();

  constructor() { 
    console.log('Desde constructor de DbService');
  }

  /* This method checks everytime an user logs in (as it's used in loginGoogle() method) if it's uid is registered in the database:
      - If registered: Does nothing.
      - If not registered: Means is his first log in so it's created a new record with a model JSON (newRecordModel)
  */
  checkNewUser2(uid:string) {
    // Path where users records are located in the db
    const path = 'Users/';

    // Model JSON to assign to the new user (if first time login) db record
    const newRecordModel = {
      favList: {
        0: 1,
        1: 5
      },
      titleFavList: 'Favoritas'
    }

    // Method execute when 'value' events occurs. Search the actual user uid in the db. If it exists nothing happens, if not it's created a new record.
    this.database.ref(path + uid).on('value',
    (queryOk) => {
      console.log('Query completed', queryOk.val());
      if (queryOk.val() == undefined) {
        console.log('Creating new user in DB');
        this.database.ref(path + uid).update(newRecordModel);
      } else {
        console.log('User already exists');
      }
    },
    (queryErr) => console.log('Query error: ', queryErr));
  }

  /* This method get the list of favourites films IDs from the user info in the database and return a promise with the values */
  async getFavList(uid:string){

    let favListPromise = this.database.ref('Users/' + uid + '/favList').once('value');

    return (await favListPromise).val();
  }

  /* This method takes a list of films IDs in order to search their reference in the "Films" collection of the database.
    Returns a promise with an array of the references values */
  async getFilmsReferences(filmList:any[]) {
    
    console.log('22: ', filmList)

    let filmListReferences = filmList.map( async film => {

      let filmRef = this.database.ref('Films/' + film ).once('value');

      console.log('cvcv: ', await (await filmRef).val());

      return (await filmRef).val();
    })

    let resolve = Promise.all(filmListReferences);

    return await resolve;
  }

  getFilms(){
    
  }
}