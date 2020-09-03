import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateMyResumeComponent } from './create-my-resume/create-my-resume.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'createresume', component:CreateMyResumeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
