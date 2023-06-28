import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureSectionComponent } from './feature-section/feature-section.component';
import { LogoSectionComponent } from './logo-section/logo-section.component';
import { SolutionsSectionComponent } from './solutions-section/solutions-section.component';
import { SolutionsCardsComponent } from './solutions-cards/solutions-cards.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { NewsSectionComponent } from './news-section/news-section.component';
import { FooterComponent } from './footer/footer.component';
import { PricesComponent } from './prices/prices.component';
import { PriceCardComponent } from './price-card/price-card.component';
import { LoginComponent } from './login/login.component';
import { BlankComponent } from './mocks/blank/blank.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
