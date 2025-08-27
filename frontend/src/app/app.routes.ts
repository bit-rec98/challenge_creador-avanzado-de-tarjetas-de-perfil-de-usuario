import { Routes } from '@angular/router';
import { UsersDashboardComponent } from './components/users-dashboard/users-dashboard.component';

export const routes: Routes = [
  { path: 'home', component: UsersDashboardComponent },
  { path: '**', redirectTo: 'home' }
];
