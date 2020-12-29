import { Component, Input, OnChanges, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Film } from 'src/app/models/film.model';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-film-short-card',
  templateUrl: './film-short-card.component.html',
  styleUrls: ['./film-short-card.component.css']
})
export class FilmShortCardComponent implements OnInit {

  @Input()
  film:Film;

  @Input()
  fav:boolean;

  img_src:string;

  constructor(public storage:StorageService, public dbService:DbService, public authService:AuthService, public cdr:ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getImgUrl();
    this.getFav();
  }

  /* This method search film's property url in database and assign the response to 'img_src' property */ 
  async getImgUrl() {
    this.storage.getImg(this.film.cartel_ref).then( url => {
      this.img_src = url;
      this.cdr.detectChanges()
    });
  }

  getFav(){
    this.dbService.database.ref(this.dbService.usersPath + this.authService.uid + '/favList/' + this.film.id).on('value', x => {
      if (x.val()) {
        this.film.isFav = true;
      }
    })
  }

  switchFav(){
    if (this.film.isFav) {
      this.dbService.removeFav(this.film.id);
      this.film.isFav = !this.film.isFav;
    } else {
      this.dbService.addFav(this.film.id);
    }
    // console.log(this.film.isFav);
    // console.log(this.film.isFav);
  }

  //Recibe un objeto Film y crea un componente film-short-card con la info de este

}
