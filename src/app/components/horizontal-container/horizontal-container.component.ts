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
  bckg_color:string;

  films:Film[] = null;

  constructor(public dbService:DbService, public authService:AuthService) { 
    console.log('Desde constructor de header');
    console.log(this.films);
  }

  // test = this.authService.user.subscribe( () => {
  //   console.log('Change notice Horizontal COmponent');
  //   this.getReetet();
  // });
  
  // test = this.authService.user.pipe( map( authState => {
  //   console.log('authState44: ', authState);
  //   if(!authState){
  //     console.log('Change notice Horizontal COmponent')
  //   }
  // }))

  async ngOnInit(): Promise<void> {
    console.log('Desde OnInit de Horizontal');
    this.authService.user.subscribe( x => {
      this.getReetet()
    })
  }

  

  async getReetet(){
    // console.log('uid: ',this.authService.authState.uid)
    this.dbService.getFilmsReferences(await this.dbService.getFavList(this.authService.authState.uid))
    .then( x => {
      this.films = x;
      console.log(this.films);
    })
  }

  //Recibe un Film[] para hacer un *ngFor por cada film para que cree un short-card-film por cada uno

}
