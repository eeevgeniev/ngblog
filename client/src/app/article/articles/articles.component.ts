import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequesterService } from '../../http-requester.service';
import { ArticlePageViewModel } from '../../models/articles/articlePageViewModel';
import { ArticleInfoViewModel } from '../../models/articles/articleInfoViewModel';
import { MessageService } from '../../services/message.service';

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
    this.httpRequesterService.getArticles(this.page)
    .subscribe((articlePageViewModel: ArticlePageViewModel) => {
      if (articlePageViewModel.success === true) {
        this.articleInfoViewModel = articlePageViewModel.articles;
        this.page = articlePageViewModel.page;
        this.pages = [];
        for (let i = 1; i <= articlePageViewModel.pages; i += 1) {
          this.pages.push(i);
        }
      }  else {
        this.messageService.add(articlePageViewModel.message);
      }
    });
  }
};