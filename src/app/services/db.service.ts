import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Film } from '../models/film.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  database = firebase.database();

  constructor(public db: AngularFireDatabase) { 
    console.log('Desde constructor de DbService');
  }

  /*This method checks everytime an user logs in (as it's used in loginGoogle() method) if it's uid is registered in the database:
    - If registered: Does nothing.
    - If not registered: Means is his first log in so it's created a new record with a model JSON (newRecordModel)
  */
  checkNewUser2(uid:string) {
    //Path where users records are located in the db
    const path = 'Users/';

    //Model JSON to assign to the new user (if first time login) db record
    const newRecordModel = {
      favList: {
        0: 1,
        1: 5
      },
      titleFavList: 'Favoritas'
    }

    //Method execute when 'value' events occurs. Search the actual user uid in the db. If it exists nothing happens, if not it's created a new record.
    this.database.ref(path + uid).on('value',
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

  async direct(uid:string){

    let gg = this.database.ref('Users/' + uid + '/favList').once('value');

    return (await gg).val();

    // let xx = (await gg).val();

    // console.log('XXX: ', xx)

    // , x => {
    //   x.val().forEach( v => {
    //     console.log(v)
    //     this.database.ref('Films/' + v).once( 'value', y => console.log('yy: ',y.val()))
    //   } )
    // });
  }

  async direct2(ff:[]) {

    let films = [];

    // let cc = this.database.ref('Films/' + x).once('value');

    // let prom = this.database.ref('Films/').equalTo(rrr()).once('value', resolve);
    console.log(ff);

    let v = await ff.map( async x => {

      let oo = this.database.ref('Films/' + x).once('value');

      console.log('cvcv: ', await (await oo).val());

      // y = await (await oo).val();

      // this.database.ref('Films/' + x).once('value', x => {
      //   console.log('¿?: ', x.val()); 
      //   films.push( x.val().cartel_ref); 
      //   y = x.val();
      //   // return x.val();
      // })
      return await (await oo).val();
    })

    // ff.forEach( x => {
    //   this.database.ref('Films/' + x).once('value', async x => {
    //     console.log('¿?: ',await  x.val()); 
    //     films.push(await x.val().cartel_ref); 
    //   })
    // })

    let kk = Promise.all(v);

// console.log(await v);

    return await kk;
  }

  //This method returns a promise with a callback parameter to executes code
  async getUserFavList(uid:string){

    const path = 'Users/';

    // let gg = null;

    // await this.database.ref(path + uid + '/favList').on('value', x => gg = x.val());

    // return gg;

    return new Promise<any>(resolve => {
      this.database.ref(path + uid + '/favList').on('value', resolve)
    });

    // return tryr();
  }

  getFilms(asd:Promise<any>){

    const path = 'Films/';

    let films:Film[] = [];
    
    // return firebase.database().ref(path).once('value').then((snapshot) => {
    //   var username = (snapshot.val()[5]) || 'Anonymous';
    //   return username;
    // });

    // asd.then(x => {
      
    //   console.log('912CV: ', x.val());
    //   x.val().forEach(async element => {
    //     console.log(element)
    //     await this.database.ref(path + element).on('value', async x => await films.push(x.val()))
    //   })
    //   // console.log(films);
    //   // this.database.ref(path + element).on('value', resolve, x => console.error(x))
    // })

    // return films;
    

    return new Promise<any>( resolve =>  {
      asd.then(x => {
        console.log('expo: ', x.exportVal());
        console.log('expo2: ', x.val())
        x.val().forEach(element => {
          this.database.ref(path + element).once('value', resolve);
          return element;
        })
        // console.log(films);
        // this.database.ref(path + element).on('value', resolve, x => console.error(x))
      });
      
    }
    );
  }
}

    // setTimeout( () => console.log('Boof'), 1000);

    // const wait = () => new Promise(resolve => setTimeout(resolve, 4000));

    // return wait();