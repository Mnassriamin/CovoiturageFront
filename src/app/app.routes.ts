import { Routes } from '@angular/router';
import { RegisterCovoitureurComponent } from './components/register-covoitureur/register-covoitureur.component';
import { ConducteursComponent } from './components/conducteurs/conducteurs.component';
import { CovoitureursComponent } from './components/covoitureurs/covoitureurs.component';
import { TrajetsComponent } from './components/trajets/trajets.component';
import { AddTrajetComponent } from './components/add-trajet/add-trajet.component';
import { RegisterConducteurComponent } from './components/register-conducteur/register-conducteur.component';
import { SignupSelectorComponent } from './components/signup-selector/signup-selector.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CovoitureurGuard } from './guards/covoitureur.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { TrajetDetailsComponent } from './components/trajet-details/trajet-details.component';
import { ReservationsComponent } from './components/reservations/reservations.component';

export const routes: Routes = [
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard, CovoitureurGuard] },
  { path: 'trajet-details/:id', component: TrajetDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupSelectorComponent },
  { path: 'trajets/add', component: AddTrajetComponent, canActivate: [AuthGuard, CovoitureurGuard] },
  { path: 'trajets', component: TrajetsComponent, canActivate: [AuthGuard, CovoitureurGuard] },
  { path: 'register-covoitureur', component: RegisterCovoitureurComponent },
  { path: '', redirectTo: '/trajets', pathMatch: 'full' },
  { path: 'conducteurs', component: ConducteursComponent },
  { path: 'register-conducteur', component: RegisterConducteurComponent },
  { path: 'covoitureurs', component: CovoitureursComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard, CovoitureurGuard] },
];
