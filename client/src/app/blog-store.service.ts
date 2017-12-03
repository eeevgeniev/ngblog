import { Injectable } from '@angular/core';

@Injectable()
export class BlogStoreService {
  private user: string = 'user';
  private token: string = 'token';

  constructor() { }

  public registerUser(username: string, token: string) {
    localStorage.setItem(this.user, username);
    localStorage.setItem(this.token, token);
  }

  public clearStore() {
    localStorage.clear();
  }

  public isUserRegistered(): boolean { 
    let userResult = localStorage.getItem(this.user);
    let tokenResult = localStorage.getItem(this.token);

    if (userResult === undefined || userResult === null || tokenResult === undefined || tokenResult === null) {
      return false;
    }
    
    return true;
  }
};