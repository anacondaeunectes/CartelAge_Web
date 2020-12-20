import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menu_isVisible:boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.auth.currentUser.then(user => console.log(user)));
  }

  //Recibe un Film[] para hacer un *ngFor por cada film para que cree un short-card-film por cada uno

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
