import { Component, OnInit } from '@angular/core';
import { HttpRequesterService } from '../../services/requester/http-requester.service';
import { ActivatedRoute } from '@angular/router';
import { ArticleViewModel } from '../../models/articles/articleViewModel';
import { ArticleResponseModel } from '../../models/articles/articleResponseModel';
import { MessageService } from '../../services/messages/message.service';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  private model: ArticleViewModel;
  private image: string = null;
  private id: string = null;
  private index = 0;
  
  constructor(
    private httpRequestService: HttpRequesterService,
    private route: ActivatedRoute,
    private messageService: MessageService) { }

  onLeftBtnClick() {
    if (this.model.images.length > 0) {
      if (this.index - 1 < 0) {
        this.index = this.model.images.length - 1;
      } else {
        this.index--;
      }

      this.image = this.model.images[this.index];
    }
  }

  onRightBtnClick() {
    if (this.model.images.length > 0) {
      if (this.index + 1 >= this.model.images.length) {
        this.index = 0;
      } else {
        this.index++;
      }

      this.image = this.model.images[this.index];
    }
  }

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
          if (this.model.images.length > 0) {
            this.image = this.model.images[0];
          }
        } else {
          this.messageService.add(articleResponseModel.message);
        }
      });
  }
}