import { Component, OnInit } from '@angular/core';
import { ArticleInputModel } from '../models/articles/articleInputModel';
import { HttpRequesterService } from '../http-requester.service';
import { ArticleResponseModel } from '../models/articles/articleResponseModel';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  private model: ArticleInputModel = new ArticleInputModel('', '', []);
  private tags: string[] = ['Test', 'Another'];
  
  constructor(private httpRequesterService: HttpRequesterService) { }

  onSubmit() {
    this.httpRequesterService.createArticle(this.model)
      .subscribe((articleResponseModel: ArticleResponseModel) => {
        if (articleResponseModel.success) {
          console.log('success');
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
  }
};