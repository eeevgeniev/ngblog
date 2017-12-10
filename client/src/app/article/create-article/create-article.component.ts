import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequesterService } from '../../http-requester.service';
import { ArticleInputModel } from '../../models/articles/articleInputModel';
import { ArticleResponseModel } from '../../models/articles/articleResponseModel';
import { TagResponseModel } from '../../models/tags/tagResponseModel';
import { Tag } from '../../models/tags/tag';

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
    private route: Router) { }

  onSubmit() {
    this.httpRequesterService.createArticle(this.model)
      .subscribe((articleResponseModel: ArticleResponseModel) => {
        if (articleResponseModel.success) {
          this.route.navigate([`/edit/${articleResponseModel.article._id}`]);
        } else {
          console.log(articleResponseModel.message);
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
        if (tagResponseModel.success) {
          this.tags = tagResponseModel.tags;
        } else {
          console.log(tagResponseModel.message);
        }
      });
  }
};