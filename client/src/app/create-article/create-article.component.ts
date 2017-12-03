import { Component, OnInit } from '@angular/core';
import { ArticleInputModel } from '../models/articles/articleInputModel';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  private model = new ArticleInputModel('', '', []);
  private tags: string[] = ['Test', 'Another'];
  
  constructor() { }

  onSubmit() {
    // to do
  }

  onTagClicked(e) {
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