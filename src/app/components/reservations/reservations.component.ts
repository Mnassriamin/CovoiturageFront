import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  imports: [CommonModule],
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];
  covoitureurId: string | null = null;
  error: string | null = null;
  isLoading = true;

  constructor(private apiService: ApiService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.covoitureurId = this.cookieService.get('userId');
    if (this.covoitureurId) {
      this.fetchReservations();
    } else {
      this.error = 'Covoitureur ID not found in cookies.';
      this.isLoading = false;
    }
  }

  fetchReservations(): void {
    this.isLoading = true;
    this.apiService.getReservationsByCovoitureur(+this.covoitureurId!).subscribe(
      (data) => {
        console.log('Fetched reservations:', data);
        this.reservations = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
        this.error = 'Failed to load reservations.';
        this.isLoading = false;
      }
    );
  }

  confirmReservation(reservationId: number): void {
    if (confirm('Are you sure you want to confirm this reservation?')) {
      this.apiService.confirmReservation(reservationId).subscribe(
        () => {
          alert('Reservation confirmed!');
          this.fetchReservations(); // Refresh reservations
        },
        (error) => {
          console.error('Error confirming reservation:', error);
          alert('Failed to confirm the reservation. Please try again.');
        }
      );
    }
  }

  isReservationForTrajet(trajetId: number): boolean {
    return this.reservations.some((reservation) => reservation.trajet.id === trajetId);
  }
}
