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
  covoitureurId: number | null = null; // Ensuring consistent type as 'number'
  error: string | null = null;
  isLoading = true;

  constructor(private apiService: ApiService, private cookieService: CookieService) {}

  ngOnInit(): void {
    const userId = this.cookieService.get('userId');
    if (userId) {
      this.covoitureurId = parseInt(userId, 10); // Parse as a number
    }

    if (this.covoitureurId) {
      this.fetchReservations();
    } else {
      this.error = 'Covoitureur ID not found in cookies.';
      this.isLoading = false;
    }
  }

  fetchReservations(): void {
    if (!this.covoitureurId) {
        this.error = 'Covoitureur ID is null.';
        this.isLoading = false;
        return;
    }

    this.apiService.getReservationsByCovoitureur(this.covoitureurId).subscribe(
        (reservations: any[]) => { // Assuming the backend response is an array
            console.log('Raw Reservations:', reservations); // Debug log the raw response
            this.reservations = reservations.map((reservation: any) => ({
                ...reservation,
                id: reservation.reservationId, // Map reservationId to id
                confirme: !!reservation.confirme // Ensure boolean format
            }));
            this.isLoading = false;
            console.log('Mapped Reservations:', this.reservations); // Debug log
        },
        (error) => {
            console.error('Error fetching reservations:', error);
            this.error = 'Failed to load reservations.';
            this.isLoading = false;
        }
    );
  }

  
}
