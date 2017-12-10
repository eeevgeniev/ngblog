import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';
import { RegisterComponent } from '../user/register/register.component';
import { CreateArticleComponent } from '../article/create-article/create-article.component';
import { ArticlesComponent } from '../article/articles/articles.component';
import { ViewArticleComponent } from '../article/view-article/view-article.component';
import { MeComponent } from '../user/me/me.component';
import { MyComponent } from '../article/my/my.component';
import { EditArticleComponent } from '../article/edit-article/edit-article.component';

const routes: Routes = [
  { path: '', redirectTo: 'articles/1', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new', component: CreateArticleComponent },
  { path: 'articles/:page', component: ArticlesComponent },
  { path: 'my/:page', component: MyComponent },
  { path: 'edit/:id', component: EditArticleComponent },
  { path: 'article/:id', component: ViewArticleComponent },
  { path: 'me', component: MeComponent }
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