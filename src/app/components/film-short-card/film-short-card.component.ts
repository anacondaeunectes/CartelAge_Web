import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-film-short-card',
  templateUrl: './film-short-card.component.html',
  styleUrls: ['./film-short-card.component.css']
})
export class FilmShortCardComponent implements OnInit {

  // img_src="../../../assets/imgs/Star_Wars.jpg";
  title="Star Wars";

  img_src: Observable<string | null>;

  constructor(public storage:AngularFireStorage) { 
    const ref = this.storage.ref('historia-interminable.jpg');
    this.img_src = ref.getDownloadURL();  
    // this.img_src.subscribe()  
  }

  ngOnInit(): void {
  }

  //Recibe un objeto Film y crea un componente film-short-card con la info de este

}
