import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup-selector',
  templateUrl: './signup-selector.component.html',
  styleUrls: ['./signup-selector.component.css'],
})
export class SignupSelectorComponent implements OnInit {
  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    // Check if the user is already logged in based on the presence of a cookie
    if (this.cookieService.check('user')) {
      alert('You are already logged in!');
      this.router.navigate(['/']); // Redirect to homepage or dashboard
    }
  }

  goToSignup(dtype: string): void {
    if (dtype === 'conducteur') {
      this.router.navigate(['/register-conducteur']);
    } else if (dtype === 'covoitureur') {
      this.router.navigate(['/register-covoitureur']);
    }
  }
}
