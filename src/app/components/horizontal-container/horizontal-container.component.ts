import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-horizontal-container',
  templateUrl: './horizontal-container.component.html',
  styleUrls: ['./horizontal-container.component.css']
})
export class HorizontalContainerComponent {

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

    this.dbService.onFavRemoved( favRemoved => {

      this.films.splice(this.films.findIndex( x => x.id == favRemoved.key), 1);
      this.cdr.detectChanges();

    });

  }

  update(){
    console.log(this.films);
    this.cdr.detectChanges();
  }


}
