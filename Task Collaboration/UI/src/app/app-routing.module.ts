import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { EditTaskComponent } from './Components/edit-task/edit-task.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AuthGuard } from './services/auth.guard';
import { CollaborateComponent } from './Components/collaborate/collaborate.component';
import { RequestsComponent } from './Components/requests/requests.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'edit/:id/:task',
    component: EditTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'colaborate/:task/:id/:userName',
    component: CollaborateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'requests/:userName',
    component: RequestsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
