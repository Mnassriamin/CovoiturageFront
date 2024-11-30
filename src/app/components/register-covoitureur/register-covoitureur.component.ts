import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-covoitureur',
  standalone: true,
  templateUrl: './register-covoitureur.component.html',
  styleUrls: ['./register-covoitureur.component.css'],
  imports:[CommonModule,FormsModule]
})
export class RegisterCovoitureurComponent {
  covoitureur = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
  };
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(): void {
    this.http.post('http://localhost:8080/api/utilisateurs/register-covoitureur', this.covoitureur).subscribe({
      next: () => {
        alert('Covoitureur registered successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error(err);
      },
    });
  }
}
