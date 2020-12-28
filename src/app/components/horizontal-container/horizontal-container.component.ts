import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

  films:Film[] = [];

  constructor(public dbService:DbService, public authService:AuthService, public cdr:ChangeDetectorRef) { 

    this.dbService.onFavAdded( favAdded => {

      this.dbService.database.ref(this.dbService.filmsPath + favAdded.key).once('value').then( x => {
        this.films.push(x.val());
        this.cdr.detectChanges();
      })

    });

    // this.dbService.database.ref(this.dbService.usersPath + this.authService.uid + '/favList/').on('child_added', favAdded => {
    //   console.log(favAdded.key)
    //   this.dbService.database.ref(this.dbService.filmsPath + favAdded.key).once('value').then( x => {
    //     console.log(x.val())
    //     this.films.push(x.val());
    //     this.cdr.detectChanges();
    //   })
    // });

    this.dbService.onFavRemoved( favRemoved => {

      this.films.splice(this.films.findIndex( x => x.id == favRemoved.key), 1);
      this.cdr.detectChanges();

    });

    // this.dbService.database.ref(this.dbService.usersPath + this.authService.uid + '/favList/').on('child_removed', favRemoved => {
    //   console.log(favRemoved.key)
    //   console.log(this.films.findIndex( x => x.id == favRemoved.key))
    //   this.films.splice(this.films.findIndex( x => x.id == favRemoved.key), 1);
    //   this.cdr.detectChanges();
    // });


    /* Susbscription attached to database user property Observer:
        - When an user logs out, films property is set to null 
        - When an user logs in, executes getFavListUrls() in order to charge new user fav films list.
    */
    // this.authService.user.subscribe(async x => {
    //   console.log('cambio');
    //   if(x != null){
    //   console.log('cambio222');
    //     this.getFavListUrls();

    //     // this.dbService.getFilmsReferences(await this.getTest()).then( x => {
    //     //   this.films = x;
    //     //   console.log(this.films);
    //     // })
    //   }else{
    //     console.log('NULL');
    //     this.films = null;
    //   }
    // })

  }

  async ngOnInit(): Promise<void> {
    console.log('Desde OnInit de Horizontal');
    // console.log((await this.getTest()))
  }

  update(){
    console.log(this.films);
    this.cdr.detectChanges();
    // this.films = [...this.films];
  }

  //Recibe un Film[] para hacer un *ngFor por cada film para que cree un short-card-film por cada uno

}
