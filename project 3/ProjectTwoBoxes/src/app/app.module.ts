import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParentComponent } from './components/parent/parent.component';
import { Box1Component } from './components/box1/box1.component';
import { Box2Component } from './components/box2/box2.component';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';


@NgModule({
  declarations: [AppComponent, ParentComponent, Box1Component, Box2Component],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule,CdkDropList, NgFor, CdkDrag],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
