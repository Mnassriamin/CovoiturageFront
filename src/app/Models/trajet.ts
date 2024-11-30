export interface Trajet {
  id?: number;
  departureLocation: string;
  arrivalLocation: string;
  date: string;
  availableSeats: number;
  conducteurId: number;
}
