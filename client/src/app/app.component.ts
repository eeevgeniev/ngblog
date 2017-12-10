import { Component, OnInit } from '@angular/core';
import { BlogStoreService } from './blog-store.service';
import { HttpRequesterService } from './http-requester.service';
import { ResponseModel } from './models/responses/responseModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = 'NgBlog';
  private username: string = null;

  constructor(
    private blogStoreService: BlogStoreService,
    private httpRequestService: HttpRequesterService) {}

  onLogout() {
    this.httpRequestService.logout()
      .subscribe((responseModel: ResponseModel) => {
        if (responseModel.success) {
          this.blogStoreService.clearStore();
          window.location.href = '/login';
          this.username = null;
        } else {
          console.log(responseModel.message);
        }
      })
  }

  ngOnInit() {
    this.username = this.blogStoreService.getUser();
  }
}
