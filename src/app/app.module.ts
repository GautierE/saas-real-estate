import { environment } from '../environments/environment.default';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderSectionComponent } from './landing-page/header-section/header-section.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureSectionComponent } from './landing-page/feature-section/feature-section.component';
import { LogoSectionComponent } from './landing-page/logo-section/logo-section.component';
import { SolutionsSectionComponent } from './landing-page/solutions-section/solutions-section.component';
import { SolutionsCardsComponent } from './landing-page/solutions-section/solutions-cards/solutions-cards.component';
import { TestimonialsSectionComponent } from './landing-page/testimonials-section/testimonials-section.component';
import { NewsSectionComponent } from './landing-page/news-section/news-section.component';
import { FooterComponent } from './footer/footer.component';
import { PricesComponent } from './prices/prices.component';
import { PriceCardComponent } from './prices/price-card/price-card.component';
import { LoginComponent } from './auth/login/login.component';
import { BlankComponent } from './mocks/blank/blank.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { SideMenuComponent } from './home/side-menu/side-menu.component';
import { PropertyCardComponent } from './home/side-menu/property-card/property-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderSectionComponent,
    ContactComponent,
    FeatureSectionComponent,
    LogoSectionComponent,
    SolutionsSectionComponent,
    SolutionsCardsComponent,
    TestimonialsSectionComponent,
    NewsSectionComponent,
    FooterComponent,
    PricesComponent,
    PriceCardComponent,
    LoginComponent,
    BlankComponent,
    HomeComponent,
    SignupComponent,
    SideMenuComponent,
    PropertyCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
