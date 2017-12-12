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
  private articleInfoViewModel: ArticleInfoViewModel[] = [];
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

    this.reloadPage();
  }

  reloadPage() {
    this.httpRequesterService.getMyArticles(this.page)
    .subscribe((articlePageViewModel: ArticlePageViewModel) => {
      if (articlePageViewModel.success === true) {
        this.articleInfoViewModel = articlePageViewModel.articles;
        this.pages = [];
        this.page = articlePageViewModel.page;
        for (let i = 1; i <= articlePageViewModel.pages; i += 1) {
          this.pages.push(i);
        }
      }  else {
        this.messageService.add(articlePageViewModel.message);
      }
    });
  };
};