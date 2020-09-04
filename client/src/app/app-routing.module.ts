import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateMyResumeComponent } from './create-my-resume/create-my-resume.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'createresume', component:CreateMyResumeComponent},
  {path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
