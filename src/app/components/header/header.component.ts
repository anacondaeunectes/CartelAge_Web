import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menu_isVisible:boolean = false;

  constructor(public authService: AuthService, public storageService:StorageService) { 
    console.log('Desde constructor de header');
   }

  ngOnInit(): void {
    console.log('Desde OnInit de header');
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

  logout() {
    this.authService.logout();

    if (this.menu_isVisible) {
      document.getElementById("header__LoginDropdownMenu").style.display = "none";

      this.menu_isVisible = false;
    }
  }

  toggleDropdownButton(){

    if (this.menu_isVisible) {
        document.getElementById("header__LoginDropdownMenu").style.display = "none";
    } else {
        document.getElementById("header__LoginDropdownMenu").style.display = "block";
    }

    this.menu_isVisible = !this.menu_isVisible;
  }

}
