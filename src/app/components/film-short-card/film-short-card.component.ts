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

  img_src:string = null;

  constructor(public storage:StorageService) {
     console.log('Desde constructor de film-short-card');
    // const ref = this.storage.ref('historia-interminable.jpg').;
    // this.img_src = ref.getDownloadURL();  
    // this.img_src.subscribe()  
  }

  ngOnInit(): void {
    console.log('film: ', this.film)
    // this.getImg();
    this.storage.getImg(this.film.cartel_ref).then( url => this.img_src = url);
  }

  // async getImg(/*img_ref:string*/) {
  //   this.storage.storage.ref(this.film.cartel_ref).getDownloadURL().then( url => this.img_src = url);
  // }

  //Recibe un objeto Film y crea un componente film-short-card con la info de este

}
