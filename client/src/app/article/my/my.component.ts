import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequesterService } from '../../services/requester/http-requester.service';
import { ArticlePageViewModel } from '../../models/articles/articlePageViewModel';
import { ArticleInfoViewModel } from '../../models/articles/articleInfoViewModel';
import { MessageService } from '../../services/messages/message.service';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {
  private articleInfoViewModel: ArticleInfoViewModel[][] = [];
  private hasArticles: boolean = false;
  private page: number = 0;
  private pages: number[] = [];

  constructor(
    private route: ActivatedRoute, 
    private httpRequesterService: HttpRequesterService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.page = parseInt(params.page);
      this.reloadPage();
    });
  }

  reloadPage() {
    this.httpRequesterService.getMyArticles(this.page)
    .subscribe((articlePageViewModel: ArticlePageViewModel) => {
      if (articlePageViewModel.articles.length > 0) {
        this.hasArticles = true;
      } else {
        this.hasArticles = false;
      }
      
      this.articleInfoViewModel = [];
      if (articlePageViewModel.success === true) {
        let counter = 0,
            articles: ArticleInfoViewModel[] = [];

        articlePageViewModel.articles.forEach(a => {
          articles.push(a);
          counter++;

          if (counter === 4) {
            this.articleInfoViewModel.push(articles);
            articles = [];
            counter = 0;
          }
        });

        this.articleInfoViewModel.push(articles);

        this.page = articlePageViewModel.page;
        this.pages = [];
        for (let i = 1; i <= articlePageViewModel.pages; i += 1) {
          this.pages.push(i);
        }
      }  else {
        this.messageService.add(articlePageViewModel.message);
      }
    });
  };
};