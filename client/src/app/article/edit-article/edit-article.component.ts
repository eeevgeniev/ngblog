import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpRequesterService } from '../../http-requester.service';
import { ArticleInputModel } from '../../models/articles/articleInputModel';
import { ArticleResponseModel } from '../../models/articles/articleResponseModel';
import { ArticleEditModel } from '../../models/articles/articleEditModel';
import { TagResponseModel } from '../../models/tags/tagResponseModel';
import { Tag } from '../../models/tags/tag';
import { MessageService } from '../../services/message.service';
import { ResponseModel } from '../../models/responses/responseModel';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  private model: ArticleEditModel = new ArticleEditModel(null, '', '', [], []);
  private id: string = null;
  private tags: Tag[] = [];
  private canAddImages = false;
  private newImages = [];
  
  constructor(
    private httpRequesterService: HttpRequesterService,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService) { }

  onSubmit() {
    this.httpRequesterService.editArticle(this.model)
      .subscribe((articleResponseModel: ArticleResponseModel) => {
        if (articleResponseModel.success) {
          this.messageService.add('Article was edited.');
        } else {
          this.messageService.add(articleResponseModel.message);
        }
      });
  }

  onImagesSubmit(event) {
    var form = new FormData(event.target as HTMLFormElement);
    this.httpRequesterService.uploadImages(this.model._id, form)
      .subscribe((responseModel: ResponseModel) => {
        if (responseModel.success === true) {
          this.messageService.add('Image/images was/were uploaded.');
        }
      });
  }

  onDelete() {
    this.httpRequesterService.deleteArticle(this.model._id)
      .subscribe(() => (articleResponseModel: ArticleResponseModel) => {
        if (articleResponseModel.success) {
          this.model = articleResponseModel.article;
          this.messageService.add('Article was deleted.');
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

  isChecked(name) {
    if (this.model && this.model.tags) {
      return this.model.tags.some(t => t === name);
    }

    return false;
  }
  
  ngOnInit() {
    if (this.activateRoute.snapshot.paramMap.get('id')) {
      this.id = this.activateRoute.snapshot.paramMap.get('id');
    }

    if (!this.id) {
      return;
    }

    this.httpRequesterService.getArticle(this.id)
      .subscribe((articleResponseModel: ArticleResponseModel) => {
        if (articleResponseModel.success === true) {
          this.model = articleResponseModel.article;
          
          if (this.model.images.length < 5) {
            for (var i = 0, length = 5 - (this.model.images.length); i < length; i += 1) {
              this.newImages.push({});
            }
          }

          this.canAddImages = (this.model.images.length < 5);
        } else {
          this.messageService.add(articleResponseModel.message);
        }
      });

    this.httpRequesterService.getTags()
      .subscribe((tagResponseModel: TagResponseModel) => {
        if (tagResponseModel.success) {
          this.tags = tagResponseModel.tags;
        } else {
          console.log(tagResponseModel.message);
        }
    });
  }
}