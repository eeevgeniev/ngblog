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
import { ArticlePageViewModel } from './models/articles/articlePageViewModel';
import { ArticleEditModel } from './models/articles/articleEditModel';
import { TagResponseModel } from './models/tags/tagResponseModel';
import { Settings } from './configuration/settings';
import { UserResponseModel } from './models/users/userResponseModel';
import { User } from './models/users/user';
import { ResponseModel } from './models/responses/responseModel';
import { PasswordModel } from './models/users/passwordModel';

@Injectable()
export class HttpRequesterService {
  private headerContentType = 'content-type';
  private headerJson = 'application/json';
  private headerAuthorization = 'Authorization';
  private loginPath = 'login';
  private logoutPath = 'logout';
  private registerPath = 'register';
  private articlePath = 'article';
  private articlesPath = 'articles';
  private myPath = 'my';
  private tagPath = 'tags';
  private imagesPath = 'article/images/add';
  private mePath = 'me';
  private errorConnectionToServer = 'Error connection to server.';

  constructor(
    private httpClient: HttpClient, 
    private blogStoreService: BlogStoreService, 
    private settings: Settings) {}

  public loginUser(loginModel: LoginModel): Observable<LoginUserModel> {
    return this.httpClient.post<LoginUserModel>(`${this.settings.serverAddress}${this.loginPath}`, loginModel, {
      headers: new HttpHeaders().set(this.headerContentType, this.headerJson)})
      .pipe(
        catchError(this.handleError<LoginUserModel>(
          this.errorConnectionToServer, 
          { success: false, message: this.errorConnectionToServer, token: null, username: null}))
      );
  }

  public registerUser(registerModel: RegisterModel): Observable<LoginUserModel> {
    return this.httpClient.post<LoginUserModel>(`${this.settings.serverAddress}${this.registerPath}`, registerModel, {
      headers: new HttpHeaders().set(this.headerContentType, this.headerJson)})
      .pipe(
        catchError(this.handleError<LoginUserModel>(
          this.errorConnectionToServer, 
          { success: false, message: this.errorConnectionToServer, token: null, username: null}))
      );
  }

  public createArticle(articleInputModel: ArticleInputModel): Observable<ArticleResponseModel> {
    return this.httpClient.post<ArticleResponseModel>(`${this.settings.serverAddress}${this.articlePath}`, articleInputModel, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        catchError(this.handleError<ArticleResponseModel>(this.errorConnectionToServer,
        { success: false, message: this.errorConnectionToServer, article: null}))
      );
  }

  public editArticle(articleEditModel: ArticleEditModel): Observable<ArticleResponseModel> {
    return this.httpClient.put<ArticleResponseModel>(`${this.settings.serverAddress}${this.articlePath}`, articleEditModel, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        catchError(this.handleError<ArticleResponseModel>(this.errorConnectionToServer,
          { success: false, message: this.errorConnectionToServer, article: null}))
      );
  }

  public getArticle(id: string): Observable<ArticleResponseModel> {
    return this.httpClient.get<ArticleResponseModel>(`${this.settings.serverAddress}${this.articlePath}/${id}`, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        catchError(this.handleError<ArticleResponseModel>(this.errorConnectionToServer,
          { success: false, message: this.errorConnectionToServer, article: null}))
      );
  }

  public getArticles(page: number = 1): Observable<ArticlePageViewModel>  {
    return this.httpClient.get<ArticlePageViewModel>(`${this.settings.serverAddress}${this.articlesPath}/${page}`, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        catchError(this.handleError<ArticlePageViewModel>(this.errorConnectionToServer,
        { success: false, message: this.errorConnectionToServer, articles: null, page: -1, pages: -1 }))
      );
  }

  public getMyArticles(page: number = 1): Observable<ArticlePageViewModel> {
    return this.httpClient.get<ArticlePageViewModel>(`${this.settings.serverAddress}${this.articlesPath}/${this.myPath}/${page}`, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        catchError(this.handleError<ArticlePageViewModel>(this.errorConnectionToServer,
        { success: false, message: this.errorConnectionToServer, articles: null, page: -1, pages: -1 }))
      );
  }

  public getTags(): Observable<TagResponseModel> {
    return this.httpClient.get<TagResponseModel>(`${this.settings.serverAddress}${this.tagPath}`, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        catchError(this.handleError<TagResponseModel>(this.errorConnectionToServer,
        { success: false, message: this.errorConnectionToServer, tags: null }))
      );
  }

  public deleteArticle(id: string): Observable<ArticleResponseModel> {
    return this.httpClient.delete<ArticleResponseModel>(`${this.settings.serverAddress}${this.articlePath}/${id}`, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        catchError(this.handleError<ArticleResponseModel>(this.errorConnectionToServer, 
        { success: false, message: this.errorConnectionToServer, article: null}))
      );
  }

  public uploadImages(id: string, formData: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.settings.serverAddress}${this.imagesPath}`, formData, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())
    })
    .pipe(
      catchError(this.handleError<ResponseModel>(this.errorConnectionToServer, 
      { success: false, message: this.errorConnectionToServer }))
    );
  }

  public getMe(): Observable<UserResponseModel> {
    return this.httpClient.get<UserResponseModel>(`${this.settings.serverAddress}${this.mePath}`, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        catchError(this.handleError<UserResponseModel>(this.errorConnectionToServer,
        { success: false, message: this.errorConnectionToServer, user: null }))
      );
  }

  public updatePassword(passwordModel: PasswordModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(`${this.settings.serverAddress}${this.mePath}`, passwordModel, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        catchError(this.handleError<ResponseModel>(this.errorConnectionToServer, 
        { success: false, message: this.errorConnectionToServer }))
      );
  }

  public logout(): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.settings.serverAddress}${this.logoutPath}`, null, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        catchError(this.handleError<ResponseModel>(this.errorConnectionToServer,
        { success: false, message: this.errorConnectionToServer }))
      );
  }

  private handleError<T> (message = this.errorConnectionToServer, result?: T) {
    return (error: any): Observable<T> => {
      console.log(message);  
      return of(result as T);
    };
  }
};