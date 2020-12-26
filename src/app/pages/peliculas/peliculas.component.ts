import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from 'src/app/models/film.model';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  films:Film[] = [];

  constructor(public dbService:DbService, public authService:AuthService, private cdr:ChangeDetectorRef) { 
    // this.getFilms();
   }

  ngOnInit(): void {
    // this.dbService.database.ref('Films/').once('value').then( val => {
    //   console.log('pelis: ', val.val()[11]);
    // })
    this.onFilmAdded();
    // this.getUserFavList();
    this.onFilmRemoved();

    // this.authService.user.subscribe(async x => {
    //   console.log('cambio');
    //   if(x != null){
    //     console.log('cambio222');
    //     this.getUserFavList(x.uid);
    //   }else{
    //     console.log('NULL');
    //     this.films = null;
    //   }
    // })
  }

  getUserFavList(uid:string){
    this.dbService.getUserFavList(uid,
      x => {
        console.log('User fav list', x.val());

        this.films.forEach( film => {
          if (film) {
            
          }
        })

      }
    )
  }

  getFilms(){
    this.dbService.getFilms( x => {
      console.log('1231: ', x.val());
      this.films = x.val();
      console.log('this: ', this.films);
      // this.cdr.detectChanges();
    })
  }

  onFilmAdded(){
    this.dbService.onFilmAdded( async x => {
      if(await x != undefined){
        console.log('ADDED: ', x.val());
        this.films.push( x.val());
        // this.films = [...this.films];
        this.cdr.detectChanges();
      }
    })
  }

  onFilmRemoved(){
    this.dbService.onFilmRemoved( async x => {
      if(await x != undefined){
        this.cdr.detectChanges();
        console.log('as: ', this.films);
        console.log('REMOVED: ', x.toJSON());
        let cc2 = this.films.findIndex( value => value.title == x.val().title ? true : false );
        // let cc = this.films.indexOf(x.toJSON());
        console.log('index: ', cc2);
        this.films.splice(cc2, 1);
        // this.films = [...this.films];
        this.cdr.detectChanges();
      }
    })
  }

}
