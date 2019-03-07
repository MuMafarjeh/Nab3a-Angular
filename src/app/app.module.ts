import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
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
import { BusinessComponent } from './business/business.component';
import { CustomerComponent } from './customer/customer.component';
import { RegestrationComponent } from './regestration/regestration.component';

@NgModule({
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
    RegestrationComponent
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
    AngularFirestoreModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
