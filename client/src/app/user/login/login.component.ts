import { Component, OnInit } from '@angular/core';
import { HttpRequesterService } from '../../services/requester/http-requester.service';
import { BlogStoreService  } from '../../services/store/blog-store.service';
import { LoginModel } from '../../models/users/loginModel';
import { LoginUserModel } from '../../models/users/loginUserModel';
import { MessageService } from '../../services/messages/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private model: LoginModel = new LoginModel('', '');
  private emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  constructor(
    private httpRequesterService: HttpRequesterService, 
    private blogStoreService: BlogStoreService,
    private messageService: MessageService ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.model.email = this.model.email.trim();
    this.model.password = this.model.password.trim();

    if (!this.emailRegex.test(this.model.email)) {
      this.messageService.add('Invalid email.')
      return;
    }

    if (this.model.password.length < 4) {
      this.messageService.add('Password must be at least 4 characters.')
      return;
    }
    
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