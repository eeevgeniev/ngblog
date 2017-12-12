import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequesterService } from '../../services/requester/http-requester.service';
import { ArticleInputModel } from '../../models/articles/articleInputModel';
import { ArticleResponseModel } from '../../models/articles/articleResponseModel';
import { TagResponseModel } from '../../models/tags/tagResponseModel';
import { Tag } from '../../models/tags/tag';
import { MessageService } from '../../services/messages/message.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  private model: ArticleInputModel = new ArticleInputModel('', '', []);
  private tags: Tag[] = [];
  
  constructor(
    private httpRequesterService: HttpRequesterService, 
    private route: Router,
    private messageService: MessageService) { }

  onSubmit() {
    this.httpRequesterService.createArticle(this.model)
      .subscribe((articleResponseModel: ArticleResponseModel) => {
        if (articleResponseModel.success === true) {
          this.route.navigate([`/edit/${articleResponseModel.article._id}`]);
        } else {
          this.messageService.add(articleResponseModel.message);
        }
      });
  }

  onTagClicked(e): void {
    let value = e.target.value,
      tagIndex = -1;

    for (let i = 0, length = this.model.tags.length; i < length; i += 1) {
      if (this.model.tags[i] === value) {
        tagIndex = i;
        break;
      }
    }

    if (tagIndex > -1) {
      this.model.tags.splice(tagIndex, 1);
    } else {
      this.model.tags.push(value);
    }
  }

  ngOnInit() {
    this.httpRequesterService.getTags()
      .subscribe((tagResponseModel: TagResponseModel) => {
        if (tagResponseModel.success === true) {
          this.tags = tagResponseModel.tags;
        } else {
          this.messageService.add(tagResponseModel.message);
        }
      });
  }
};