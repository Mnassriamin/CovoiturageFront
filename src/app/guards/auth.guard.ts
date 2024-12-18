import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean {
    const userName = this.cookieService.get('userName');
    if (userName) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
