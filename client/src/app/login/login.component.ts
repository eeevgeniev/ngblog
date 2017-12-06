import { Component, OnInit } from '@angular/core';
import { HttpRequesterService } from '../http-requester.service';
import { BlogStoreService  } from '../blog-store.service';
import { LoginModel } from '../models/users/loginModel';
import { LoginUserModel } from '../models/users/loginUserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private model: LoginModel = new LoginModel('', '');
  
  constructor(
    private httpRequesterService: HttpRequesterService, 
    private blogStoreService: BlogStoreService ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.httpRequesterService.loginUser(this.model)
      .subscribe((loginUserModel: LoginUserModel) => {
        console.log(loginUserModel);
        if (loginUserModel.successful) {
          this.blogStoreService.registerUser(loginUserModel.username, loginUserModel.token);
        } else {
          console.log(loginUserModel.message);
        }
      });
  }
};