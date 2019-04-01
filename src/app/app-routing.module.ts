import { BusinessOrderComponent } from './business-order/business-order.component';
import { BusinessGuard } from './auth/business-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginEmailComponent } from './registration/login/login-email/login-email.component';
import { LoginComponent } from './registration/login/login.component';
import { BusinessAddProductComponent } from './business-add-product/business-add-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import { ItemsPageComponent } from './items-page/items-page.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  {
    path: 'items', component: ItemsPageComponent,
    canActivate: [BusinessGuard]
  },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'business-add-product', component: BusinessAddProductComponent,
    canActivate: [BusinessGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'login-email', component: LoginEmailComponent },

  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'business-order', component: BusinessOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
