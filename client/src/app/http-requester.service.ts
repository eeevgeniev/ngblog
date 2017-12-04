import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { BlogStoreService } from './blog-store.service';
import { LoginModel } from './models/users/loginModel';
import { LoginUserModel } from './models/users/loginUserModel';
import { RegisterModel } from './models/users/registerModel';
import { ArticleInputModel } from './models/articles/articleInputModel';
import { ArticleResponseModel } from './models/articles/articleResponseModel';

@Injectable()
export class HttpRequesterService {
  private headerContentType = 'content-type';
  private headerJson = 'application/json';
  private headerAuthorization = 'Authorization';
  private serverPath = 'to do';

  constructor(private httpClient: HttpClient, private blogStoreService: BlogStoreService) { }

  public loginUser(loginModel: LoginModel): Observable<LoginUserModel> {
    return this.httpClient.post<LoginUserModel>(this.serverPath, loginModel, {
      headers: new HttpHeaders().set(this.headerContentType, this.headerJson)})
      .pipe(
        tap((loginUserModel: LoginUserModel) => 'to do'),
        catchError(this.handleError<LoginUserModel>('register user'))
      );
  }

  public registerUser(registerModel: RegisterModel): Observable<LoginUserModel> {
    return this.httpClient.post<LoginUserModel>(this.serverPath, registerModel, {
      headers: new HttpHeaders().set(this.headerContentType, this.headerJson)})
      .pipe(
        tap((loginUserModel: LoginUserModel) => 'to do'),
        catchError(this.handleError<LoginUserModel>('register user'))
      );
  }

  public createArticle(articleInputModel: ArticleInputModel): Observable<ArticleResponseModel> {
    return this.httpClient.post<ArticleResponseModel>(this.serverPath, articleInputModel, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        tap((articleResponseModel: ArticleResponseModel) => 'to do'),
        catchError(this.handleError<ArticleResponseModel>('Create article.'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
};