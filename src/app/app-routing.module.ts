import { Guard } from './auth/guard.service';
import { FollowingCustomerPageComponent } from './following-customer-page/following-customer-page.component';
import { BusinessOrderComponent } from './business-order/business-order.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
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
import { ItemCustomerPageComponent } from './item-customer-page/item-customer-page.component';
import { BusinessNotificationsComponent } from './business-notifications/business-notifications.component';
import { HomePageCustomerComponent } from './home-page-customer/home-page-customer.component';
import { CustomerBrowseItemsComponent } from './customer-browse-items/customer-browse-items.component';
import { CustomerNotificationPageComponent } from './customer-notification-page/customer-notification-page.component';
import { CustomerCartPageComponent } from './customer-cart-page/customer-cart-page.component';
import { Globals } from './globals';
import { HomePageBusinessComponent } from './home-page-business/home-page-business.component';
import { CustomerGuard } from './auth/customer-guard.service';
import { StoreCustomerPageComponent } from './store-customer-page/store-customer-page.component';

const routes: Routes = [
  { 
    path: '', component: HomeComponent,
    canActivate: [Guard]
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: `${Globals.MyStoreRoute}`, component: ItemsPageComponent,
    canActivate: [BusinessGuard]
  },
  {
    path: 'customer-cart-page', component: CustomerCartPageComponent,
    canActivate: [CustomerGuard]
  },
  {
    path: 'customer-notification-page', component: CustomerNotificationPageComponent,
    canActivate: [CustomerGuard]
  },
  {
    path: 'customer-browse-items', component: CustomerBrowseItemsComponent,

  },
  {
    path: 'home-page-business', component: HomePageBusinessComponent,
    canActivate: [BusinessGuard]
  },
  {
    path: 'business-notifications', component: BusinessNotificationsComponent,
    canActivate: [BusinessGuard]
  },

  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: 'business-add-product', component: BusinessAddProductComponent,
    canActivate: [BusinessGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'login-email', component: LoginEmailComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  {
    path: 'home-page-customer', component: HomePageCustomerComponent,
    canActivate: [CustomerGuard]
  },
  {
    path: 'business-order', component: BusinessOrderComponent,
    canActivate: [BusinessGuard]
  },
  {
    path: 'following-customer-page', component: FollowingCustomerPageComponent,
    canActivate: [CustomerGuard]
  },
  {
    path: 'item/:id', component: ItemCustomerPageComponent,
    runGuardsAndResolvers: 'paramsChange'
  },
  {
    path: 'business/:id', component: StoreCustomerPageComponent,
    runGuardsAndResolvers: 'paramsChange'
  },
  {
    path: 'customer-order', component: CustomerOrderComponent,
    canActivate: [CustomerGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
