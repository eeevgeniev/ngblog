import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BlogRoutingModule } from  './blog-routing/blog-routing.module';
import { CreateArticleComponent } from './create-article/create-article.component';
import { BlogStoreService } from './blog-store.service';
import { HttpRequesterService } from './http-requester.service';
import { ArticlesComponent } from './articles/articles.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CreateArticleComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BlogRoutingModule
  ],
  providers: [
    BlogStoreService, 
    HttpRequesterService],
  bootstrap: [AppComponent]
})

export class AppModule { };