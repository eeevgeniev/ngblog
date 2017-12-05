import { Component, OnInit } from '@angular/core';
import { HttpRequesterService } from '../http-requester.service';
import { ArticlePageViewModel } from '../models/articles/articlePageViewModel';
import { ArticleInfoViewModel } from '../models/articles/articleInfoViewModel';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  private articlePageViewModel: ArticlePageViewModel;
  private page: number = 0;
  private search: string = '';
  
  constructor(private httpRequesterService: HttpRequesterService) { }

  ngOnInit() {
    this.httpRequesterService.getArticles(this.page)
      .subscribe(articlePageViewModel => this.articlePageViewModel = articlePageViewModel);
  }

};