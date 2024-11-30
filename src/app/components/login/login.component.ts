import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.services';
import { FormsModule } from '@angular/forms';
import { AuthCookieService } from '../../services/AuthCookie.services';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(
    private apiService: ApiService,
    private authCookieService: AuthCookieService,
    private router: Router
  ) {}

  loginUser(): void {
    if (!this.loginData.email || !this.loginData.password) {
      alert('All fields are required!');
      return;
    }

    this.apiService.login(this.loginData).subscribe(
      (response: any) => {
        alert('Login successful!');
        
        this.authCookieService.setCookie('userName', response.nom, 1); 
        this.authCookieService.setCookie('userId', response.id, 1); 
        this.authCookieService.setCookie('userType', response.dtype, 1); 

        // Redirect based on user type
        if (response.dtype === 'Conducteur') {
          this.router.navigate(['/trajets']);
        } else if (response.dtype === 'Covoitureur') {
          this.router.navigate(['/trajets']);
        }
      },
      (error) => {
        console.error('Login error:', error);
        alert('Invalid email or password!');
      }
    );
  }
}
