import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { PopUpComponent } from './layout/pop-up/pop-up.component';

import { ConsultComponent } from './page/consult/consult.component';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'consult', component: ConsultComponent},
  {path: 'pop-up', component: PopUpComponent},
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
