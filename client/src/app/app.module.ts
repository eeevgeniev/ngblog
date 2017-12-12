import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BlogRoutingModule } from  './blog-routing/blog-routing.module';
import { BlogStoreService } from './services/store/blog-store.service';
import { HttpRequesterService } from './services/requester/http-requester.service';
import { Settings } from './configuration/settings';
import { ArticleModule } from './article/article-module/article.module';
import { UserModule } from './user/user/user.module';
import { MessageComponent } from './messages/message/message.component';
import { MessageService } from './services/messages/message.service';
import { AuthGuardianService } from './guards/auth-guardian.service';
import { NoAuthGuardianService } from './guards/noauth-guardian.service';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
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
    Settings,
    MessageService,
    AuthGuardianService,
    NoAuthGuardianService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { };