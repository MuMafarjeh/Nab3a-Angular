import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth"
import { AngularFireFunctionsModule } from '@angular/fire/functions'


import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component'
import { UserService } from './user/user.service';
import { MaterialModule } from './material';
import { ItemsPageComponent } from './items-page/items-page.component';
import { ItemComponent } from './item/item.component';
import { BusinessAddProductComponent } from './business-add-product/business-add-product.component';
import { BusinessComponent } from './registration/business/business.component';
import { CustomerComponent } from './registration/customer/customer.component';
import { RegistrationComponent } from './registration/registration.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ItemDeleteSnackbarComponent } from './item/item-delete-snackbar/item-delete-snackbar.component';
import { LoginComponent } from './registration/login/login.component';
import { LoginEmailComponent } from './registration/login/login-email/login-email.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BusinessOrderComponent } from './business-order/business-order.component';
import { BusinessOrderComponentComponent } from './business-order/business-order-component/business-order-component.component';
import { MyDialogComponent } from './business-order/business-order-component/my-dialog/my-dialog.component';
import { NgAisModule } from 'angular-instantsearch';
import { ItemCustomerSuggestionComponent } from './item-customer-suggestion/item-customer-suggestion.component';
import {NgxPageClickModule} from 'ngx-page-click';
import { ItemCustomerPageComponent } from './item-customer-page/item-customer-page.component'
import { AuthService } from './auth/auth.service';
import { BusinessNotificationsComponent } from './business-notifications/business-notifications.component'
import { HomePageCustomerComponent } from './home-page-customer/home-page-customer.component';
import { CustomerBrowseItemsComponent } from './customer-browse-items/customer-browse-items.component';
import { CustomerNotificationPageComponent } from './customer-notification-page/customer-notification-page.component';
import { CustomerCartPageComponent } from './customer-cart-page/customer-cart-page.component';

@NgModule({
  entryComponents: [
    ItemDeleteSnackbarComponent,
    MyDialogComponent,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    AboutComponent,
    ContactComponent,
    ItemsPageComponent,
    ItemComponent,
    BusinessAddProductComponent,
    BusinessComponent,
    CustomerComponent,
    RegistrationComponent,
    ItemDeleteSnackbarComponent,
    LoginComponent,
    LoginEmailComponent,
    PageNotFoundComponent,
    BusinessOrderComponent,
    BusinessOrderComponentComponent,
    MyDialogComponent,
    ItemCustomerSuggestionComponent,
    ItemCustomerPageComponent,

    BusinessNotificationsComponent,
    HomePageCustomerComponent,
    CustomerBrowseItemsComponent,
    CustomerNotificationPageComponent,
    CustomerCartPageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    NgAisModule.forRoot(),
    NgxPageClickModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireFunctionsModule,
    AuthService,
    UserService,
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: [] },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
