import { Component } from '@angular/core';
import { BlogStoreService } from './blog-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'NGBlog';

  constructor(private blogStoreService: BlogStoreService) {

  }
}
