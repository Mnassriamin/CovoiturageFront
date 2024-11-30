import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.services';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trajet-details',
  standalone: true,
  templateUrl: './trajet-details.component.html',
  styleUrls: ['./trajet-details.component.css'],
  imports: [CommonModule],
})
export class TrajetDetailsComponent implements OnInit {
  trajet: any = null; // Initialize as null to avoid undefined errors
  isLoading: boolean = true;
  error: string | null = null;
  hasApplied: boolean = false; // Tracks if the user has applied for this trajet

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const trajetId = this.route.snapshot.paramMap.get('id');
    const covoitureurId = this.cookieService.get('userId');

    if (trajetId) {
      this.apiService.getTrajetDetails(+trajetId).subscribe(
        (response: any) => {
          console.log('Trajet Details:', response); // Debugging API response
          this.trajet = response; // Set the response to `trajet`
          this.isLoading = false; // Data loaded successfully

          // Check if the user has already applied for this trajet
          this.hasApplied = response?.reservations?.some(
            (res: any) => res.covoitureurId === +covoitureurId
          );
        },
        (error) => {
          console.error('Error fetching trajet details:', error);
          this.error = 'Failed to load trajet details.';
          this.isLoading = false; // Stop loading
        }
      );
    }
  }

  applyForTrajet(): void {
    const covoitureurId = this.cookieService.get('userId');
    if (!covoitureurId || !this.trajet) {
      alert('Unable to apply. Make sure you are logged in as a Covoitureur.');
      return;
    }

    this.apiService.applyForTrajet(+covoitureurId, this.trajet.id).subscribe(
      () => {
        alert('Successfully applied for the trajet!');
        this.hasApplied = true; // Update the state
      },
      (error) => {
        console.error('Error applying for trajet:', error);
        if (error.status === 409) {
          alert('You have already applied for this trajet.');
        } else {
          alert('Failed to apply for this trajet. Please try again later.');
        }
      }
    );
  }
}
