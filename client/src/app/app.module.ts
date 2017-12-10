import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BlogRoutingModule } from  './blog-routing/blog-routing.module';
import { BlogStoreService } from './blog-store.service';
import { HttpRequesterService } from './http-requester.service';
import { Settings } from './configuration/settings';
import { ArticleModule } from './article/article-module/article.module';
import { UserModule } from './user/user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BlogRoutingModule,
    ArticleModule,
    UserModule
  ],
  providers: [
    BlogStoreService, 
    HttpRequesterService,
    Settings
  ],
  bootstrap: [AppComponent]
})

export class AppModule { };