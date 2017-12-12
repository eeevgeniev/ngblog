import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardianService } from '../guards/auth-guardian.service';
import { NoAuthGuardianService } from '../guards/noauth-guardian.service';
import { LoginComponent } from '../user/login/login.component';
import { RegisterComponent } from '../user/register/register.component';
import { CreateArticleComponent } from '../article/create-article/create-article.component';
import { ArticlesComponent } from '../article/articles/articles.component';
import { ViewArticleComponent } from '../article/view-article/view-article.component';
import { MeComponent } from '../user/me/me.component';
import { MyComponent } from '../article/my/my.component';
import { EditArticleComponent } from '../article/edit-article/edit-article.component';

const routes: Routes = [
  { path: '', redirectTo: 'articles/1', pathMatch: 'full', canActivate: [AuthGuardianService] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuardianService] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuardianService] },
  { path: 'new', component: CreateArticleComponent, canActivate: [AuthGuardianService] },
  { path: 'articles/:page', component: ArticlesComponent, canActivate: [AuthGuardianService] },
  { path: 'my/:page', component: MyComponent, canActivate: [AuthGuardianService] },
  { path: 'edit/:id', component: EditArticleComponent, canActivate: [AuthGuardianService] },
  { path: 'article/:id', component: ViewArticleComponent, canActivate: [AuthGuardianService] },
  { path: 'me', component: MeComponent, canActivate: [AuthGuardianService] }
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