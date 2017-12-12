import { Component, OnInit } from '@angular/core';
import { HttpRequesterService } from '../../http-requester.service';
import { BlogStoreService  } from '../../blog-store.service';
import { LoginModel } from '../../models/users/loginModel';
import { LoginUserModel } from '../../models/users/loginUserModel';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private model: LoginModel = new LoginModel('', '');
  
  constructor(
    private httpRequesterService: HttpRequesterService, 
    private blogStoreService: BlogStoreService,
    private messageService: MessageService ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.httpRequesterService.loginUser(this.model)
      .subscribe((loginUserModel: LoginUserModel) => {
        if (loginUserModel.success === true) {
          this.blogStoreService.registerUser(loginUserModel.username, loginUserModel.token);
          window.location.href = '/articles/1';
        } else {
          this.messageService.add(loginUserModel.message);
        }
      });
  }
};