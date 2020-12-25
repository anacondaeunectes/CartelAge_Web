import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HorizontalContainerComponent } from './components/horizontal-container/horizontal-container.component';
import { FilmShortCardComponent } from './components/film-short-card/film-short-card.component';
import { HeaderComponent } from './components/header/header.component';
import { environment } from 'src/environments/environment';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { FavoritasComponent } from './pages/favoritas/favoritas.component';
import { VerticalContainerComponent } from './components/vertical-container/vertical-container.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LogInComponent } from './pages/log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    HorizontalContainerComponent,
    FilmShortCardComponent,
    HeaderComponent,
    PeliculasComponent,
    FavoritasComponent,
    VerticalContainerComponent,
    NotFoundComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
