import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { AuthService } from './auth.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage:AngularFireStorage, public dbService:DbService, public authService: AuthService) { }
  
  getList(){
    
  }
  
}
