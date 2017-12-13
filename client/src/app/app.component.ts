import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogStoreService } from './services/store/blog-store.service';
import { HttpRequesterService } from './services/requester/http-requester.service';
import { MessageService } from './services/messages/message.service';
import { ResponseModel } from './models/responses/responseModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = 'NgBlog';

  constructor(
    private router: Router,
    private blogStoreService: BlogStoreService,
    private httpRequestService: HttpRequesterService,
    private messageService: MessageService) {}

  onLogout() {
    this.httpRequestService.logout()
      .subscribe((responseModel: ResponseModel) => {
        if (responseModel.success === true) {
          this.blogStoreService.clearStore();
          this.router.navigate(['/login']);
        } else {
          this.messageService.add(responseModel.message);
        }
      });
  }

  ngOnInit() {}
}