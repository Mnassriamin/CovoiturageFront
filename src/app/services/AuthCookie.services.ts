import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthCookieService {
  constructor(private cookieService: CookieService) {}

  setCookie(name: string, value: string, days: number): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    this.cookieService.set(name, value, { expires });
  }

  getCookie(name: string): string {
    return this.cookieService.get(name);
  }

  deleteCookie(name: string): void {
    this.cookieService.delete(name);
  }

  clearAllCookies(): void {
    this.cookieService.deleteAll();
  }
}
