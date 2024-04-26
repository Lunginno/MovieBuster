import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';

const routes: Routes = [
  {path:'nav' , component:NavBarComponent},
  {path: 'cards', component:CardsComponent},
  {path: '',   redirectTo: 'cards', pathMatch: 'full' }, 
  { path: 'movie-details/:id', component: MovieDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
