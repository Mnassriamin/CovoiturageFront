import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CovoitureurGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const parsedUser = JSON.parse(user);
    if (parsedUser.dtype !== 'Covoitureur') {
      alert('Access Denied: Only Covoitureurs can access this page.');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
