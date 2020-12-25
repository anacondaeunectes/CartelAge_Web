import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Film } from 'src/app/models/film.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-film-short-card',
  templateUrl: './film-short-card.component.html',
  styleUrls: ['./film-short-card.component.css']
})
export class FilmShortCardComponent implements OnInit {

  @Input()
  film:Film;

  fav:boolean = false;

  img_src:string = null;

  constructor(public storage:StorageService) {
     console.log('Desde constructor de film-short-card');  
  }

  ngOnInit(): void {
    console.log('film: ', this.film)
    this.getImgUrl();
  }

  /* This method search film's property url in database and assign to response to img_src property */ 
  async getImgUrl() {
    this.storage.getImg(this.film.cartel_ref).then( url => this.img_src = url);
  }

  switchFav(){
    this.fav = !this.fav;
  }

  //Recibe un objeto Film y crea un componente film-short-card con la info de este

}
