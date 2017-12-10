import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { BlogRoutingModule } from '../../blog-routing/blog-routing.module';
import { LoginComponent } from '../login/login.component';
import { MeComponent } from '../me/me.component';
import { RegisterComponent } from '../register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BlogRoutingModule
  ]
})
export class UserModule { }