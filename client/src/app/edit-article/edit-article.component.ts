import { Component, OnInit } from '@angular/core';
import { ArticleInputModel } from '../models/articles/articleInputModel';
import { HttpRequesterService } from '../http-requester.service';
import { ArticleResponseModel } from '../models/articles/articleResponseModel';
import { ArticleEditModel } from '../models/articles/articleEditModel';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  private model: ArticleEditModel = new ArticleEditModel(-1, '', '', []);
  private tags: string[] = ['Test', 'Another'];
  
  constructor(private httpRequesterService: HttpRequesterService) { }

  onSubmit() {
    this.httpRequesterService.editArticle(this.model)
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
}