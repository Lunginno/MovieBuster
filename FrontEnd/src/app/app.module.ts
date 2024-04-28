import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { CardsComponent } from './components/cards/cards.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/cards/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailsComponent,
    WatchlistComponent,
    HomePageComponent,
    NavBarComponent,
    CardsComponent,
    HomePageComponent,
    MovieDetailsComponent,
    ProfileComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
