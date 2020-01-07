import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router){}

  canActivate(): Promise<boolean> {
    console.log('entrei');
    return new Promise (resolve=>{
      this.authService.getAuth().onAuthStateChanged(user=>{
        //se n tiver user, leva para pagina de login
        if(!user)
          this.router.navigate(['']);

          resolve(user ? true: false)
      })
    })
  }
}
