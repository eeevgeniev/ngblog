import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { BlogStoreService  } from '../services/store/blog-store.service';

@Injectable()
export class NoAuthGuardianService implements CanActivate {

  constructor(
    private blogStoreService: BlogStoreService,
    private router: Router) { }

  canActivate() {
    if (!this.blogStoreService.isUserRegistered()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}