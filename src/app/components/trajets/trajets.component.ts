import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthCookieService } from '../../services/AuthCookie.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trajets',
  standalone: true,
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css'],
  imports: [CommonModule, FormsModule],
})
export class TrajetsComponent implements OnInit {
  trajets: any[] = [];
  newTrajet = {
    lieuDepart: '',
    lieuArrivee: '',
    dateHeure: '',
    prix: 0,
  };
  editingTrajet: any = null;
  userName: string | null = null;
  userType: string | null = null;
  conducteurId: number | null = null;

  constructor(
    private authCookieService: AuthCookieService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    if (this.userType === 'Conducteur') {
      this.getTrajetsByConducteur();
    } else if (this.userType === 'Covoitureur') {
      this.getAllTrajets();
    }
  }

  checkLoginStatus(): void {
    this.userName = this.authCookieService.getCookie('userName');
    this.userType = this.authCookieService.getCookie('userType');
    const userId = this.authCookieService.getCookie('userId');

    if (userId) {
      this.conducteurId = +userId; // Convert to number
    }

    console.log('User Type:', this.userType, 'Conducteur ID:', this.conducteurId);
  }

  getAllTrajets(): void {
    this.apiService.getAllTrajets().subscribe(
      (data) => {
        this.trajets = data;
      },
      (error) => {
        console.error('Error fetching all trajets:', error);
      }
    );
  }

  getTrajetsByConducteur(): void {
    if (!this.conducteurId) {
      alert('No conducteur ID found. Please log in.');
      return;
    }

    this.apiService.getTrajetsByConducteur(this.conducteurId).subscribe(
      (data) => {
        this.trajets = data;
      },
      (error) => {
        console.error('Error fetching trajets for conducteur:', error);
      }
    );
  }
  

  addTrajet(): void {
    if (
      !this.newTrajet.lieuDepart ||
      !this.newTrajet.lieuArrivee ||
      !this.newTrajet.dateHeure ||
      this.newTrajet.prix <= 0
    ) {
      alert('All fields are required and price must be greater than 0!');
      return;
    }

    if (!this.conducteurId) {
      console.error('Conducteur ID is null. Cannot add trajet.');
      return;
    }

    this.apiService.addTrajetWithConducteur(this.newTrajet, this.conducteurId).subscribe(
      () => {
        alert('Trajet added successfully!');
        this.getTrajetsByConducteur(); // Refresh list
        this.resetNewTrajet();
      },
      (error) => {
        console.error('Error adding trajet:', error);
        alert('Failed to add trajet.');
      }
    );
  }

  editTrajet(trajet: any): void {
    this.editingTrajet = { ...trajet };
  }

  updateTrajet(): void {
    if (
      !this.editingTrajet.lieuDepart ||
      !this.editingTrajet.lieuArrivee ||
      !this.editingTrajet.dateHeure ||
      !this.editingTrajet.prix
    ) {
      alert('All fields are required!');
      return;
    }
    this.apiService.updateTrajet(this.editingTrajet.id, this.editingTrajet).subscribe(
      () => {
        alert('Trajet updated successfully!');
        this.getTrajetsByConducteur(); // Refresh the list
        this.editingTrajet = null; // Exit edit mode
      },
      (error) => {
        console.error('Error updating trajet:', error);
        alert('Failed to update trajet.');
      }
    );
  }

  deleteTrajet(id: number): void {
    if (confirm('Are you sure you want to delete this trajet?')) {
      this.apiService.deleteTrajet(id).subscribe(
        () => {
          alert('Trajet deleted successfully!');
          this.getTrajetsByConducteur(); // Refresh the list
        },
        (error) => {
          console.error('Error deleting trajet:', error);
          alert('Failed to delete trajet.');
        }
      );
    }
  }

  cancelEdit(): void {
    this.editingTrajet = null;
  }

  resetNewTrajet(): void {
    this.newTrajet = {
      lieuDepart: '',
      lieuArrivee: '',
      dateHeure: '',
      prix: 0,
    };
  }

  viewTrajet(trajetId: number): void {
    this.router.navigate([`/trajet-details/${trajetId}`]);
  }
}
