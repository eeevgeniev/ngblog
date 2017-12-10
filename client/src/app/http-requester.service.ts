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

  constructor(
    private httpClient: HttpClient, 
    private blogStoreService: BlogStoreService, 
    private settings: Settings) {}

  public loginUser(loginModel: LoginModel): Observable<LoginUserModel> {
    return this.httpClient.post<LoginUserModel>(`${this.settings.serverAddress}${this.loginPath}`, loginModel, {
      headers: new HttpHeaders().set(this.headerContentType, this.headerJson)})
      .pipe(
        tap((loginUserModel: LoginUserModel) => 'to do'),
        catchError(this.handleError<LoginUserModel>('register user'))
      );
  }

  public registerUser(registerModel: RegisterModel): Observable<LoginUserModel> {
    return this.httpClient.post<LoginUserModel>(`${this.settings.serverAddress}${this.registerPath}`, registerModel, {
      headers: new HttpHeaders().set(this.headerContentType, this.headerJson)})
      .pipe(
        tap((loginUserModel: LoginUserModel) => 'to do'),
        catchError(this.handleError<LoginUserModel>('register user'))
      );
  }

  public createArticle(articleInputModel: ArticleInputModel): Observable<ArticleResponseModel> {
    return this.httpClient.post<ArticleResponseModel>(`${this.settings.serverAddress}${this.articlePath}`, articleInputModel, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        tap((articleResponseModel: ArticleResponseModel) => 'to do'),
        catchError(this.handleError<ArticleResponseModel>('Create article.'))
      );
  }

  public editArticle(articleEditModel: ArticleEditModel): Observable<ArticleResponseModel> {
    return this.httpClient.put<ArticleResponseModel>(`${this.settings.serverAddress}${this.articlePath}`, articleEditModel, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        tap((articleResponseModel: ArticleResponseModel) => 'to do'),
        catchError(this.handleError<ArticleResponseModel>('Edit article.'))
      );
  }

  public getArticle(id: string): Observable<ArticleResponseModel> {
    return this.httpClient.get<ArticleResponseModel>(`${this.settings.serverAddress}${this.articlePath}/${id}`, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        tap((articleResponseModel: ArticleResponseModel) => 'to do'),
        catchError(this.handleError<ArticleResponseModel>('Edit article.'))
      );
  }

  public getArticles(page: number = 1): Observable<ArticlePageViewModel>  {
    return this.httpClient.get<ArticlePageViewModel>(`${this.settings.serverAddress}${this.articlesPath}/${page}`, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        tap((articlePageViewModel: ArticlePageViewModel) => 'to do'),
        catchError(this.handleError<ArticlePageViewModel>('get articles'))
      );
  }

  public getMyArticles(page: number = 1): Observable<ArticlePageViewModel> {
    return this.httpClient.get<ArticlePageViewModel>(`${this.settings.serverAddress}${this.articlesPath}/${this.myPath}/${page}`, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        tap((articlePageViewModel: ArticlePageViewModel) => 'to do'),
        catchError(this.handleError<ArticlePageViewModel>('get my articles'))
      );
  };

  public getTags(): Observable<TagResponseModel> {
    return this.httpClient.get<TagResponseModel>(`${this.settings.serverAddress}${this.tagPath}`, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        tap((tagResponseModel: TagResponseModel) => 'to do'),
        catchError(this.handleError<TagResponseModel>('get my articles'))
      )
  }

  public deleteArticle(id: string): Observable<ArticleResponseModel> {
    return this.httpClient.delete<ArticleResponseModel>(`${this.settings.serverAddress}${this.articlePath}/${id}`, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        tap((articleResponseModel: ArticleResponseModel) => 'to do'),
        catchError(this.handleError<ArticleResponseModel>('Delete article.'))
      );
  }

  public uploadImages(id: string, formData: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.settings.serverAddress}${this.imagesPath}`, formData, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())
    })
    .pipe(
      tap((responseModel: ResponseModel) => 'to do'),
      catchError(this.handleError<ResponseModel>('Delete article.'))
    );
  }

  public getMe(): Observable<UserResponseModel> {
    return this.httpClient.get<UserResponseModel>(`${this.settings.serverAddress}${this.mePath}`, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        tap((userResponseModel: UserResponseModel) => 'to do'),
        catchError(this.handleError<UserResponseModel>('Delete article.'))
      );
  }

  public updatePassword(passwordModel: PasswordModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(`${this.settings.serverAddress}${this.mePath}`, passwordModel, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        tap((responseModel: ResponseModel) => 'to do'),
        catchError(this.handleError<ResponseModel>('Delete article.'))
      )
  }

  public logout(): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.settings.serverAddress}${this.logoutPath}`, null, {
      headers: new HttpHeaders().set(this.headerAuthorization, this.blogStoreService.getToken())})
      .pipe(
        tap((responseModel: ResponseModel) => 'to do'),
        catchError(this.handleError<ResponseModel>('Delete article.'))
      )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
};