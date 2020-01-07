import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public authService: AuthService,
    public router: Router){}
  canActivate(): Promise<boolean> {
    return new Promise (resolve=>{
      this.authService.getAuth().onAuthStateChanged(user=>{
        //se ja tiver user, n deixa levar para pagina de login
        if(user) this.router.navigate(['tabs']);
        
        resolve(!user ? true: false)
      })
    })
  }
}
