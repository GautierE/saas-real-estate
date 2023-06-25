import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { PricesComponent } from './prices/prices.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'prices', component: PricesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
