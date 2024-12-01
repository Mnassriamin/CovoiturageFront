import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Base URL for your backend API
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Conducteurs
  getAllConducteurs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/conducteurs`);
  }

  getConducteurById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/conducteurs/${id}`);
  }

  registerConducteur(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/utilisateurs/register-conducteur`, data); // Correct endpoint
  }

  updateConducteur(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/conducteurs/${id}`, data);
  }

  deleteConducteur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/conducteurs/${id}`);
  }

  // Covoitureurs
  getAllCovoitureurs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/covoitureurs`);
  }

  getCovoitureurById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/covoitureurs/${id}`);
  }

  registerCovoitureur(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/utilisateurs/register-covoitureur`, data); // Correct endpoint
  }

  updateCovoitureur(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/covoitureurs/${id}`, data);
  }

  deleteCovoitureur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/covoitureurs/${id}`);
  }

  // Reservations
  getAllReservations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reservations`);
  }

  getReservationById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/reservations/${id}`);
  }

  addReservation(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservations`, data);
  }

  updateReservation(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/reservations/${id}`, data);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reservations/${id}`);
  }

  // Trajets
  getAllTrajets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trajets`);
  }

  getTrajetDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/trajets/${id}`);
  }

  addTrajetWithConducteur(trajet: any, conducteurId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/trajets/with-conducteur?conducteurId=${conducteurId}`,
      trajet
    );
  }

  updateTrajet(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/trajets/${id}`, data);
  }

  deleteTrajet(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/trajets/${id}`);
  }
  getTrajetsByConducteur(conducteurId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/trajets/conducteur/${conducteurId}`, {
      withCredentials: true, 
    });
  }
  
  createTrajet(trajet: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/trajets`, trajet);
  }
  
  
  // Vehicules
  getAllVehicules(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicules`);
  }

  getVehiculeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicules/${id}`);
  }

  addVehicule(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/vehicules`, data);
  }

  updateVehicule(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/vehicules/${id}`, data);
  }

  deleteVehicule(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/vehicules/${id}`);
  }

  // Login
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/utilisateurs/login`, data);
  }

  applyForTrajet(covoitureurId: number, trajetId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservations/apply`, null, {
      params: {
        covoitureurId: covoitureurId.toString(),
        trajetId: trajetId.toString(),
      },
    });
  }
  
  
  getReservationsByCovoitureur(covoitureurId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/reservations/${covoitureurId}`);
  }
  
  confirmReservation(reservationId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/reservations/confirm/${reservationId}`, null);
  }
  
  // Fetch conducteur details (including vehicle information)
getConducteurDetails(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/conducteurs/${id}`);
}

// Fetch covoitureur details
getCovoitureurDetails(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/covoitureurs/${id}`);
}
getUserProfile(userId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/utilisateurs/profile?userId=${userId}`);
}
getTrajetDetailsWithReservations(trajetId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/trajets/${trajetId}/details`, {
    withCredentials: true,
});
  
}

}
