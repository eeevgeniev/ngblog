import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CreateArticleComponent } from '../create-article/create-article.component';
import { ArticlesComponent } from '../articles/articles.component';
import { MyComponent } from '../my/my.component';

const routes: Routes = [
  { path: '', redirectTo: 'articles/1', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'article', component: CreateArticleComponent },
  { path: 'articles/:page', component: ArticlesComponent },
  { path: 'my/:page', component: MyComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class BlogRoutingModule { };