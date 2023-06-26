import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { PricesComponent } from './prices/prices.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'prices', component: PricesComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
