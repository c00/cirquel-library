import { Routes } from '@angular/router';

import { GuidelinesComponent } from './pages/guidelines/guidelines.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemComponent } from './pages/item/item.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ShirtsPromoComponent } from './pages/shirts-promo/shirts-promo.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: '@/:stub', component: ProfileComponent },
  { path: 'guidelines', component: GuidelinesComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'shirts-promo', component: ShirtsPromoComponent },
  { path: '**', component: NotFoundComponent },
]