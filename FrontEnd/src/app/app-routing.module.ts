import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomePageComponent } from './pages/home-page/home-page.component';




const routes: Routes = [
  { path: 'register', component: SignupComponent },
  { path: 'login', component: SigninComponent},
  {path:'' , component:HomePageComponent},
  {path:'profile' , component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
