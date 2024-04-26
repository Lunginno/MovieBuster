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

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailsComponent,
    WatchlistComponent,
    CardsComponent,
    HomePageComponent,
    NavBarComponent,
    WatchlistComponent,
    CardsComponent,
    HomePageComponent,
    MovieDetailsComponent,
    
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
