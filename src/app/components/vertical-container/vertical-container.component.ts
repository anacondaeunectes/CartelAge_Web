import { AfterViewChecked, Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from 'src/app/models/film.model';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-vertical-container',
  templateUrl: './vertical-container.component.html',
  styleUrls: ['./vertical-container.component.css'],
})
export class VerticalContainerComponent implements OnInit, AfterViewChecked {

  @Input()
  title:string = "";

  films:Film[];

  titleInput:string = "";

  imgInput = null;

  isAddingFilm:boolean = false;

  isRemovingFilm:boolean = false;

  constructor(public dbService:DbService, public authService:AuthService, public storageService:StorageService) { 
    this.dbService.films$.subscribe( newValue => {
      this.films = newValue;
    })
  }

  ngAfterViewChecked(): void {
  }

  ngOnInit(): void {
  }

  showForm(){
    console.log(this.isAddingFilm)
    this.isAddingFilm = !this.isAddingFilm;
  }

  setImg(event){
    console.log(event.target.files[0])
    if (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/jpeg') {
      console.log(event.target.files[0]);
      this.imgInput = event.target.files[0];
    }else{
      console.log('Img type not allowed');
    }
  }

  addFilm(){
    console.log(this.titleInput)
    if(this.titleInput.length > 0 && this.imgInput != null){
      let ref:string = this.storageService.imgPath + this.imgInput.name;
      this.dbService.addFilm(this.titleInput, ref);
      this.storageService.uploadImg(ref, this.imgInput);
      this.imgInput = null;
      this.titleInput = "";
      this.isAddingFilm = false;
    }else{
      alert(`Failed to upload film, please be aware of: 
        - Title can't be empty
        - A img (.png , .jpg) is neccesary`)
    }

  }

  removeFilm(film:Film){
    console.log(this.isRemovingFilm)
    if (this.isRemovingFilm) {
      this.dbService.removeFilm(film.id);
      this.isRemovingFilm = false;
    }
  }
}
