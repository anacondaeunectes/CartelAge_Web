import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  constructor(public dbService:DbService, public authService:AuthService) { }

  ngOnInit(): void {
    this.dbService.database.ref('Films/').once('value').then( val => {
      console.log('pelis: ', val.val()[11]);
    })
  }

}
