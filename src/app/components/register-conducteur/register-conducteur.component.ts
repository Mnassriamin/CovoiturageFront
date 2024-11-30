import { Component } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RedirectCommand } from '@angular/router';
import path from 'path';

@Component({
  selector: 'app-register-conducteur',
  standalone: true,
  templateUrl: './register-conducteur.component.html',
  styleUrls: ['./register-conducteur.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterConducteurComponent {
  // Form data
  conducteurData = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    marque: '',
    modele: '',
    immatriculation: '',
    sieges : '',
  };

  constructor(private apiService: ApiService) {}

  // Register Conducteur with Vehicule
  register(): void {
    if (this.validateForm()) {
      this.apiService.registerConducteur(this.conducteurData).subscribe(
        (response) => {
          alert('Conducteur registered successfully!');
          console.log(response);
          location.replace('/')
        },
        (error) => {
          console.error('Error registering conducteur:', error);
          alert('Error registering conducteur. Please try again.');
        }
      );
    } else {
      alert('All fields are required!');
    }
  }

  // Validate form fields
  validateForm(): boolean {
    const fields = [
      this.conducteurData.nom,
      this.conducteurData.prenom,
      this.conducteurData.email,
      this.conducteurData.telephone,
      this.conducteurData.password,
      this.conducteurData.marque,
      this.conducteurData.modele,
      this.conducteurData.immatriculation,
      this.conducteurData.sieges,
    ];
    return fields.every((field) => field.trim() !== '');
  }

  // Reset form
  resetForm(): void {
    this.conducteurData = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      password: '',
      marque: '',
      modele: '',
      immatriculation: '',
      sieges : '',
    };
  }
}
