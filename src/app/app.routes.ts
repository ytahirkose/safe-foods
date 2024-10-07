import { Routes } from '@angular/router';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {FavouritesComponent} from './pages/favourites/favourites.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: WelcomeComponent },
  { path: 'control', component: FavouritesComponent },
];
