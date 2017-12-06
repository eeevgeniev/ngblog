import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/users/registerModel';
import { HttpRequesterService } from '../http-requester.service';
import { LoginUserModel } from '../models/users/loginUserModel';
import { BlogStoreService  } from '../blog-store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private model: RegisterModel = new RegisterModel('', '', '', '');
  
  constructor(
    private httpRequesterService: HttpRequesterService, 
    private blogStoreService: BlogStoreService) { }

  onSubmit(): void {
    this.httpRequesterService.registerUser(this.model)
      .subscribe((loginUserModel: LoginUserModel) => {
        if (loginUserModel) {
          if (loginUserModel.successful) {
            this.blogStoreService.registerUser(loginUserModel.username, loginUserModel.token);
          } else {
            console.log(loginUserModel.message);
          }
        }
      });
  }

  ngOnInit() {
  }
};