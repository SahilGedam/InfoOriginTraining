import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InputBoxComponent } from './components/input-box/input-box.component';

const routes: Routes = [

  {path: '', component:HomePageComponent},
  {path:'edit/:id', component:EditFormComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path : 'input',component:InputBoxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
