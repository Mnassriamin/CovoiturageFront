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
  trajet: any = null;
  reservations: any[] = [];
  seatsAvailable: number = 0;
  isLoading: boolean = true;
  error: string | null = null;
  hasApplied: boolean = false;
  userType: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const trajetId = this.route.snapshot.paramMap.get('id');
    const userId = this.cookieService.get('userId');
    this.userType = this.cookieService.get('userType');

    if (trajetId) {
      this.apiService.getTrajetDetailsWithReservations(+trajetId).subscribe(
        (response: any) => {
          console.log('Trajet Details:', response);
          this.trajet = response.trajet;
          this.reservations = response.reservations;
          this.seatsAvailable = response.seatsAvailable;
          this.isLoading = false;

          if (this.userType === 'Covoitureur') {
            this.hasApplied = this.reservations.some(
              (res: any) => res.covoitureurId === +userId
            );
          }
        },
        (error) => {
          console.error('Error fetching trajet details:', error);
          this.error = 'Failed to load trajet details.';
          this.isLoading = false;
        }
      );
    }
  }
  confirmReservation(reservationId: number): void {
    console.log('Sending Reservation ID:', reservationId); // Debug log
    if (!reservationId || typeof reservationId !== 'number') {
      alert('Invalid reservation ID');
      return;
    }
  
    if (confirm('Are you sure you want to confirm this reservation?')) {
      this.apiService.confirmReservation(reservationId).subscribe(
        () => {
          alert('Reservation confirmed!');
          // Update the local reservations list
          const reservation = this.reservations.find((res) => res.id === reservationId);
          if (reservation) {
            reservation.confirme = true;
          }
        },
        (error) => {
          console.error('Error confirming reservation:', error);
          alert('Failed to confirm the reservation. Please try again.');
        }
      );
    }
  }

  applyForTrajet(): void {
    const userId = this.cookieService.get('userId');
    if (!userId || !this.trajet) {
      alert('Unable to apply. Make sure you are logged in as a Covoitureur.');
      return;
    }

    this.apiService.applyForTrajet(+userId, this.trajet.id).subscribe(
      () => {
        alert('Successfully applied for the trajet!');
        this.hasApplied = true;
        this.reservations.push({ covoitureurId: +userId, confirme: false }); // Add a placeholder for the application
        this.seatsAvailable -= 1;
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
