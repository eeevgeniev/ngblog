import { Injectable } from '@angular/core';

@Injectable()
export class BlogStoreService {
  public userName: string = null;
  
  private user: string = 'user';
  private token: string = 'token';

  constructor() { }

  public registerUser(username: string, token: string) {
    localStorage.setItem(this.user, username);
    localStorage.setItem(this.token, token);
    this.userName = username;
  }

  public clearStore(): void {
    localStorage.clear();
    this.userName = null;
  }

  public isUserRegistered(): boolean { 
    let userResult = localStorage.getItem(this.user);
    let tokenResult = localStorage.getItem(this.token);

    if (userResult === undefined || userResult === null || tokenResult === undefined || tokenResult === null) {
      return false;
    }
    
    return true;
  }

  public getToken(): string {
    return localStorage.getItem(this.token);
  }

  public getUser(): string {
    return localStorage.getItem(this.user);
  }
};