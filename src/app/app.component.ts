import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone : true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule,RouterOutlet],
})
export class AppComponent {
  userName: string | null = null;
  userType: string | null = null;

  constructor(private cookieService: CookieService) {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.userName = this.cookieService.get('userName') || null;
    this.userType = this.cookieService.get('userType') || null;
  }

  logout(): void {
    this.cookieService.delete('userName'); 
    this.userName = null;
    this.userType= null;
    window.location.href = '/login'; 
  }
}