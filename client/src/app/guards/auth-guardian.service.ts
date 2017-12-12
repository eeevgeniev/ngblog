import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'
import { BlogStoreService  } from '../services/store/blog-store.service';

@Injectable()
export class AuthGuardianService implements CanActivate {

  constructor(
    private blogStoreService: BlogStoreService,
    private router: Router) { }

  canActivate() {
    if (this.blogStoreService.isUserRegistered()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}