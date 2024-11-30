import { Component } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCookieService } from '../../services/AuthCookie.services';

@Component({
  selector: 'app-add-trajet',
  standalone: true,
  templateUrl: './add-trajet.component.html',
  styleUrls: ['./add-trajet.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AddTrajetComponent {
  newTrajet = { lieuDepart: '', lieuArrivee: '', dateHeure: '', prix: 0, conducteurId: 0 };

  constructor(private apiService: ApiService, private router: Router, private authCookieService: AuthCookieService) {
    this.setConducteurId();
  }

  // Set the conducteurId from the cookie
  setConducteurId(): void {
    const userType = this.authCookieService.getCookie('userType');
    if (userType === 'Conducteur') {
      const conducteurId = this.authCookieService.getCookie('userId'); // Assuming `userId` is stored in the cookies
      if (conducteurId) {
        this.newTrajet.conducteurId = parseInt(conducteurId, 10);
      } else {
        console.error('Conducteur ID not found in cookies.');
        alert('You must be logged in as a Conducteur to add a trajet.');
        this.router.navigate(['/login']); // Redirect to login if ID is missing
      }
    } else {
      console.error('User is not a Conducteur.');
      alert('Only Conducteurs can add a trajet.');
      this.router.navigate(['/login']); // Redirect to login if user is not a Conducteur
    }
  }

  createTrajet(): void {
    if (!this.newTrajet.lieuDepart || !this.newTrajet.lieuArrivee || !this.newTrajet.dateHeure || !this.newTrajet.prix) {
      alert('All fields are required!');
      return;
    }
    this.apiService.addTrajetWithConducteur(this.newTrajet, this.newTrajet.conducteurId!).subscribe(
      () => {
        alert('Trajet created successfully!');
        this.newTrajet = { lieuDepart: '', lieuArrivee: '', dateHeure: '', prix: 0, conducteurId: this.newTrajet.conducteurId };
        this.router.navigate(['/trajets']);
      },
      (error) => {
        console.error('Error creating trajet:', error);
        alert('Failed to create trajet.');
      }
    );
  }
}
