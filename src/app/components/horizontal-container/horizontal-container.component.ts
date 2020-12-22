import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Film } from 'src/app/models/film.model';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-horizontal-container',
  templateUrl: './horizontal-container.component.html',
  styleUrls: ['./horizontal-container.component.css']
})
export class HorizontalContainerComponent implements AfterViewInit, OnInit {

  @Input()
  bckg_color:string;

  films:any[] = null;

  constructor(public dbService:DbService, public authService:AuthService) { 
    console.log('Desde constructor de header');
    console.log(this.films);
    // console.log(this.greeting.subscribe((observer: Observer<string>) => observer.next))
    // this.getReetet(); 
  }
  
  async ngOnInit(): Promise<void> {
    console.log('Desde OnInit de Horizontal');
    // await this.getReetet();
    // this.getReetet();
    // console.log('123: ', await this.dbService.direct2(await this.dbService.direct(this.authService.authState.uid)));
    // this.films = await this.dbService.direct2(await this.dbService.direct(this.authService.authState.uid)); 
  }
  
  ngAfterViewInit(): void {
    // this.dbService.getUserFavList(this.authService.authState.uid).then(x => {this.films = x.val(); this.films.forEach(x => console.log(x))});
    
  }

  async ngAfterContentInit(): Promise<void> {
    console.log('llego a AfterContentInit de Horizontal');
    this.authService.user.subscribe( x => {
      this.getReetet()
    })
    // setTimeout( () =>  this.getReetet(), 2000 );
    // await this.getReetet();
  }

  async getReetet(){
    console.log('uid: ',this.authService.authState.uid)
    this.dbService.direct2(await this.dbService.direct(this.authService.authState.uid))
    .then( x => {
      this.films = x;
      console.log(this.films);
  })
  }

  // ngOnInit(): void {
  //   setTimeout( () => 
  //   this.dbService.getUserFavList(this.authService.authState.uid).then(x => this.films = x.val())
  //   ,2000);
  // }

    //Recibe un Film[] para hacer un *ngFor por cada film para que cree un short-card-film por cada uno

}
