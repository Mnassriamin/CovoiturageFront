import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { FormsModule } from '@angular/forms';
import {CommonModule}from '@angular/common';

@Component({
  selector: 'app-conducteurs',
  templateUrl: './conducteurs.component.html',
  styleUrls: ['./conducteurs.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class ConducteursComponent implements OnInit {
  conducteurs: any[] = [];
  newConducteur = { name: '', phone: '', email: '' }; // For adding a conducteur
  editingConducteur: any = null; // For editing a conducteur

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllConducteurs();
  }

  // Fetch all conducteurs
  getAllConducteurs(): void {
    this.apiService.getAllConducteurs().subscribe(
      (data: any[]) => {
        this.conducteurs = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching conducteurs:', error);
      }
    );
  }

  // Add a new conducteur


  // Edit a conducteur
  editConducteur(conducteur: any): void {
    this.editingConducteur = { ...conducteur }; // Clone the conducteur
  }

  // Update a conducteur
  updateConducteur(): void {
    if (!this.editingConducteur.nom || !this.editingConducteur.prenom || !this.editingConducteur.telephone || !this.editingConducteur.email) {
      alert('All fields are required!');
      return;
    }

    this.apiService.updateConducteur(this.editingConducteur.id, this.editingConducteur).subscribe(
      () => {
        const index = this.conducteurs.findIndex(c => c.id === this.editingConducteur.id);
        if (index !== -1) {
          this.conducteurs[index] = { ...this.editingConducteur };
        }
        alert('Conducteur updated successfully!');
        this.editingConducteur = null; // Exit edit mode
      },
      (error) => {
        console.error('Error updating conducteur:', error);
      }
    );
  }

  // Cancel editing
  cancelEdit(): void {
    this.editingConducteur = null;
  }

  // Delete a conducteur
  deleteConducteur(id: number): void {
    if (confirm('Are you sure you want to delete this conducteur?')) {
      this.apiService.deleteConducteur(id).subscribe(
        () => {
          this.conducteurs = this.conducteurs.filter(c => c.id !== id);
          alert('Conducteur deleted successfully!');
        },
        (error) => {
          console.error('Error deleting conducteur:', error);
        }
      );
    }
  }
}
