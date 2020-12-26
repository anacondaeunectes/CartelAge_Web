import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Film } from 'src/app/models/film.model';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-horizontal-container',
  templateUrl: './horizontal-container.component.html',
  styleUrls: ['./horizontal-container.component.css']
})
export class HorizontalContainerComponent implements OnInit {

  @Input()
  title:string = "TITULO";

  @Input()
  films:Film[];

  constructor(public dbService:DbService, public authService:AuthService) { 

    /* Susbscription attached to database user property Observer:
        - When an user logs out, films property is set to null 
        - When an user logs in, executes getFavListUrls() in order to charge new user fav films list.
    */
    this.authService.user.subscribe(async x => {
      console.log('cambio');
      if(x != null){
      console.log('cambio222');
        this.getFavListUrls();

        // this.dbService.getFilmsReferences(await this.getTest()).then( x => {
        //   this.films = x;
        //   console.log(this.films);
        // })
      }else{
        console.log('NULL');
        this.films = null;
      }
    })

  }

  async ngOnInit(): Promise<void> {
    console.log('Desde OnInit de Horizontal');
    // console.log((await this.getTest()))
  }

  /* This method uses db service methods in order to get an array of user fav films list */
  async getFavListUrls(){
    this.dbService.getFilmsReferences(await this.dbService.getFavList(this.authService.authState.uid))
    .then( x => {
      this.films = x;
      console.log(this.films);
    })
  }

  async getYY(){

    let gg =  await this.dbService.database.ref('Films/').once('value');

    return await gg;
  }

  async getTest(){

    let arrayTest:string[] = [];

    await this.getYY().then( p => {
      // console.log('1: ', p.exportVal());
      // console.log('2: ', p.val());
      p.forEach(element => {
        console.log(element.key)
        arrayTest.push(element.key);
      });
    })

    return arrayTest;    
  }

  //Recibe un Film[] para hacer un *ngFor por cada film para que cree un short-card-film por cada uno

}
