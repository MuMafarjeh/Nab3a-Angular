import { BusinessAddProductComponent } from './business-add-product/business-add-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import { ItemsPageComponent } from './items-page/items-page.component';
import { RegestrationComponent } from './regestration/regestration.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'items', component: ItemsPageComponent},
  { path: 'regestration', component: RegestrationComponent },
  { path: 'business-add-product', component: BusinessAddProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
