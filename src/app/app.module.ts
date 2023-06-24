import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { FeatureSectionComponent } from './feature-section/feature-section.component';
import { LogoSectionComponent } from './logo-section/logo-section.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderSectionComponent,
    ContactComponent,
    FeatureSectionComponent,
    LogoSectionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
