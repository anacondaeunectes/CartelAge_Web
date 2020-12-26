import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-favoritas',
  templateUrl: './favoritas.component.html',
  styleUrls: ['./favoritas.component.css']
})
export class FavoritasComponent implements OnInit {

  favFilms:Film[] = [];

  constructor(public authService:AuthService, public dbService:DbService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(async x => {
      console.log('cambio');
      if(x != null){
        console.log('cambio222');
        this.getUserFavFilms(x.uid);
      }else{
        console.log('NULL');
        // this.films = null;
      }
    })
  }

  getUserFavFilms(uid:string){
    this.dbService.getUserFavList(uid,
      favList => {
        console.log('User fav list', favList.val());

        favList.val().forEach( fav => {
          this.dbService.database.ref('Films/' + fav).once('value').then(x => {
            this.favFilms.push(x.val()) //Working on this
          })
        });

        // this.films.forEach( film => {
        //   if (film) {
            
        //   }
        // })

      }
    )
  }

}
