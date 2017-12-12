import { Component, OnInit } from '@angular/core';
import { HttpRequesterService } from '../../http-requester.service';
import { ActivatedRoute } from '@angular/router';
import { ArticleViewModel } from '../../models/articles/articleViewModel';
import { ArticleResponseModel } from '../../models/articles/articleResponseModel';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  private model: ArticleViewModel;
  private id: string = null;
  
  constructor(
    private httpRequestService: HttpRequesterService,
    private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
    }

    if (!this.id) {
      return;
    }

    this.httpRequestService.getArticle(this.id)
      .subscribe((articleResponseModel: ArticleResponseModel) => {
        if (articleResponseModel.success) {
          this.model = articleResponseModel.article;
        } else {
          this.messageService.add(articleResponseModel.message);
        }
      });
  }
}