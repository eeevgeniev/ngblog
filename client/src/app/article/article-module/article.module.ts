import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { BlogRoutingModule } from '../../blog-routing/blog-routing.module';
import { ArticlesComponent } from '../articles/articles.component';
import { CreateArticleComponent  } from '../create-article/create-article.component';
import { EditArticleComponent } from '../edit-article/edit-article.component';
import { MyComponent } from '../my/my.component';
import { ViewArticleComponent } from '../view-article/view-article.component';

@NgModule({
  declarations: [
    ArticlesComponent,
    CreateArticleComponent,
    EditArticleComponent,
    MyComponent,
    ViewArticleComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ArticleModule { }