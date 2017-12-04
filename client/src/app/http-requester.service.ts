import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlogStoreService } from './blog-store.service';
import { LoginModel } from './models/users/loginModel';
import { RegisterModel } from './models/users/registerModel';
import { ArticleInputModel } from './models/articles/articleInputModel';

@Injectable()
export class HttpRequesterService {
  private headerContentType = 'content-type';
  private headerJson = 'application/json';
  private headerAuthorization = 'Authorization';

  constructor(private httpClient: HttpClient, private blogStoreService: BlogStoreService) { }

  loginUser(loginModel: LoginModel) {
    this.httpClient.post('to do', loginModel, {
      headers: new HttpHeaders().set(this.headerContentType, this.headerJson)
    })
    .subscribe((result) => {
      //to do
    }, (error) => {
      //to do
    });
  }

  registerUser(registerModel: RegisterModel) {
    this.httpClient.post('to do', registerModel, {
      headers: new HttpHeaders().set(this.headerContentType, this.headerJson)
    })
    .subscribe((result) => {
      // to do
    },
    (error) => {
      // to do
    });
  }

  createArticle(articleInputModel: ArticleInputModel) {
    this.httpClient.post('to do', articleInputModel, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())
    })
    .subscribe((result) => {
      // to do
    },
    (error) => {
      // to do
    });
  }
};