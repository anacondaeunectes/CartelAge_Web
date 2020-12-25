import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-vertical-container',
  templateUrl: './vertical-container.component.html',
  styleUrls: ['./vertical-container.component.css']
})
export class VerticalContainerComponent implements OnInit {

  @Input()
  title:string = "";

  films:Film[] = null;

  constructor(public dbService:DbService, public authService:AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(async x => {
      console.log('cambio');
      if(x != null){
      console.log('cambio222');
        
        this.dbService.getFilmsReferences(await this.getTest()).then( x => {
          this.films = x;
          console.log(this.films);
        })
      }else{
        console.log('NULL');
        this.films = null;
      }
    })
  }

  async getYY(){

    let gg =  await this.dbService.database.ref('Films/').once('value');

    return await gg;
  }

  async getTest(){

    let arrayTest:string[] = [];

    await this.getYY().then( p => {
      p.forEach(element => {
        console.log(element.key)
        arrayTest.push(element.key);
      });
    })

    return arrayTest;    
  }

}
