import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { EditTaskComponent } from './Components/edit-task/edit-task.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AuthGuard } from './services/auth.guard';
import { CollaborateComponent } from './Components/collaborate/collaborate.component';
import { RequestsComponent } from './Components/requests/requests.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EditTaskComponent,
    LoginComponent,
    SignUpComponent,
    CollaborateComponent,
    RequestsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
