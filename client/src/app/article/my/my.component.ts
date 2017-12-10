import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequesterService } from '../../http-requester.service';
import { ArticlePageViewModel } from '../../models/articles/articlePageViewModel';
import { ArticleInfoViewModel } from '../../models/articles/articleInfoViewModel';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {
  private articleInfoViewModel: ArticleInfoViewModel[] = [];
  private page: number = 0;
  private pages: number[] = [];

  constructor(
    private route: ActivatedRoute, 
    private httpRequesterService: HttpRequesterService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.page = parseInt(params.page);
      this.reloadPage();
    });

    this.reloadPage();
  }

  reloadPage() {
    this.httpRequesterService.getMyArticles(this.page)
    .subscribe((articlePageViewModel: ArticlePageViewModel) => {
      if (!articlePageViewModel) {
        return;
      }
      if (articlePageViewModel.success) {
        this.articleInfoViewModel = articlePageViewModel.articles;
        this.pages = [];
        this.page = articlePageViewModel.page;
        for (let i = 1; i <= articlePageViewModel.pages; i += 1) {
          this.pages.push(i);
        }
      }  else {
        console.log(articlePageViewModel.message);
      }
    });
  };
};