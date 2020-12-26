import { Component, Input, OnChanges, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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

  @Input()
  fav:boolean;

  img_src:string;

  constructor(public storage:StorageService, private cdr:ChangeDetectorRef) {
     console.log('Desde constructor de film-short-card');
    //  this.cdr.markForCheck();
    //  setInterval( () => {
    //   console.log('asd')
    //   this.cdr.detectChanges()
    // }, 2000)
  }

  ngOnInit(): void {
    console.log('film: ', this.film)
    this.getImgUrl();
  }

  /* This method search film's property url in database and assign to response to img_src property */ 
  async getImgUrl() {
    this.storage.getImg(this.film.cartel_ref).then( url => {this.img_src = url; this.cdr.detectChanges()});
  }

  switchFav(){
    this.fav = !this.fav;
    console.log(this.fav);
    this.cdr.detectChanges();
  }

  //Recibe un objeto Film y crea un componente film-short-card con la info de este

}
