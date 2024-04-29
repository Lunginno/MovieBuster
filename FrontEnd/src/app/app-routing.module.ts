import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';




const routes: Routes = [
  {path: 'register', component: SignupComponent },
  {path: 'login', component: SigninComponent},
  {path:'home' , component:HomePageComponent},
  {path:'profile' , component:ProfileComponent},
  {path:'watchlist' , component:WatchlistComponent},
  {path:'details/:id' , component:MovieDetailsComponent},
  {path:'nav' , component:NavBarComponent},
  {path: 'cards', component:CardsComponent},
  {path: '',   redirectTo: 'homepage', pathMatch: 'full' }, 
  {path: 'details/:id', component: MovieDetailsComponent },
  {path: '**', component:HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
