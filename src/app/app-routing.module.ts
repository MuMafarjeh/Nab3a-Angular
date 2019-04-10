import { BusinessOrderComponent } from './business-order/business-order.component';
import { BusinessGuard } from './auth/business-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginEmailComponent } from './registration/login/login-email/login-email.component';
import { LoginComponent } from './registration/login/login.component';
import { BusinessAddProductComponent } from './business-add-product/business-add-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ItemsPageComponent } from './items-page/items-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { BusinessNotificationsComponent } from './business-notifications/business-notifications.component';
import { HomePageCustomerComponent } from './home-page-customer/home-page-customer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
//<<<<<<< HEAD
  { path: 'contact', component: ContactComponent },
//=======
  { path: 'contact', component: ContactComponent},
//>>>>>>> b1adc5933ec3bab06bcac581e7f9aee59a5c4793
  {
    path: 'items', component: ItemsPageComponent,
    canActivate: [BusinessGuard]
  },
 
  { 
    path: 'business-notifications', component: BusinessNotificationsComponent, 
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
 //HEAD
  {
    path: 'home-page-customer', component: HomePageCustomerComponent,
    
  },

  { path: 'business-order', component: BusinessOrderComponent },
 //b1adc5933ec3bab06bcac581e7f9aee59a5c4793
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
