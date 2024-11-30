import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-covoitureurs',
  templateUrl: './covoitureurs.component.html',
  standalone: true,
  styleUrls: ['./covoitureurs.component.css'],
  providers: [ApiService],
  imports: [FormsModule, CommonModule]
})
export class CovoitureursComponent implements OnInit {
  covoitureurs: any[] = [];
  editingCovoitureur: any = null; // For edit mode

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllCovoitureurs();
  }

  // Fetch all covoitureurs
  getAllCovoitureurs(): void {
    this.apiService.getAllCovoitureurs().subscribe(
      (data: any[]) => {
        this.covoitureurs = data;
      },
      (error) => {
        console.error('Error fetching covoitureurs:', error);
      }
    );
  }

  // Edit a covoitureur
  editCovoitureur(covoitureur: any): void {
    this.editingCovoitureur = { ...covoitureur }; // Clone for editing
  }

  // Update a covoitureur
  updateCovoitureur(): void {
    if (
      !this.editingCovoitureur.name ||
      !this.editingCovoitureur.phone ||
      !this.editingCovoitureur.email
    ) {
      alert('All fields are required!');
      return;
    }

    this.apiService
      .updateCovoitureur(this.editingCovoitureur.id, this.editingCovoitureur)
      .subscribe(
        () => {
          const index = this.covoitureurs.findIndex(
            (c) => c.id === this.editingCovoitureur.id
          );
          if (index !== -1) {
            this.covoitureurs[index] = { ...this.editingCovoitureur };
          }
          alert('Covoitureur updated successfully!');
          this.editingCovoitureur = null; // Exit edit mode
        },
        (error) => {
          console.error('Error updating covoitureur:', error);
        }
      );
  }

  // Cancel editing
  cancelEdit(): void {
    this.editingCovoitureur = null;
  }

  // Delete a covoitureur
  deleteCovoitureur(id: number): void {
    if (confirm('Are you sure you want to delete this covoitureur?')) {
      this.apiService.deleteCovoitureur(id).subscribe(
        () => {
          this.covoitureurs = this.covoitureurs.filter((c) => c.id !== id);
          alert('Covoitureur deleted successfully!');
        },
        (error) => {
          console.error('Error deleting covoitureur:', error);
        }
      );
    }
  }
}
