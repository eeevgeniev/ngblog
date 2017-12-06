import { Component, OnInit } from '@angular/core';
import { HttpRequesterService } from '../http-requester.service';
import { ActivatedRoute } from '@angular/router';
import { ArticlePageViewModel } from '../models/articles/articlePageViewModel';
import { ArticleInfoViewModel } from '../models/articles/articleInfoViewModel';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  private articleInfoViewModel: ArticleInfoViewModel[] = [];
  private page: number = 0;
  private pages: number[] = [];
  private search: string = '';
  
  constructor(private route: ActivatedRoute, private httpRequesterService: HttpRequesterService) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('page')) {
      this.page = parseInt(this.route.snapshot.paramMap.get('page'));
    }

    this.httpRequesterService.getArticles(this.page)
      .subscribe((articlePageViewModel: ArticlePageViewModel) => {
        if (!articlePageViewModel) {
          return;
        }
        if (articlePageViewModel.success) {
          this.articleInfoViewModel = articlePageViewModel.articles;
          this.page = articlePageViewModel.page;
          for (let i = 1; i <= articlePageViewModel.pages; i += 1) {
            this.pages.push(i);
          }
        }  else {
          console.log(articlePageViewModel.message);
        }
      });
  }
};