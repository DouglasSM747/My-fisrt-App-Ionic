import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }
  signOut(){
    this.afAuth.auth.signOut().then(data=>{
      location.reload();
    })
  }
  
  
  getAuth(){
    return this.afAuth.auth;
  }
}
