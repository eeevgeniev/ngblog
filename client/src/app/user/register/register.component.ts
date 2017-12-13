import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../models/users/registerModel';
import { HttpRequesterService } from '../../services/requester/http-requester.service';
import { LoginUserModel } from '../../models/users/loginUserModel';
import { BlogStoreService } from '../../services/store/blog-store.service';
import { MessageService } from '../../services/messages/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private model: RegisterModel = new RegisterModel('', '', '', '');
  private emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  constructor(
    private httpRequesterService: HttpRequesterService, 
    private blogStoreService: BlogStoreService,
    private messageService: MessageService) { }

  onSubmit(): void {
    this.model.username = this.model.username.trim();
    this.model.email = this.model.email.trim();
    this.model.password = this.model.password.trim();
    this.model.confirmPassword = this.model.confirmPassword.trim();
    
    if (this.model.username.length < 4) {
      this.messageService.add('Username must be at least 4 characters.')
      return;
    }
    
    if (!this.emailRegex.test(this.model.email)) {
      this.messageService.add('Invalid email.')
      return;
    }

    if (this.model.password.length < 4) {
      this.messageService.add('Password must be at least 4 characters.')
      return;
    }

    if (this.model.confirmPassword.length < 4) {
      this.messageService.add('Confirm password must be at least 4 characters.')
      return;
    }

    if (this.model.password !== this.model.confirmPassword) {
      this.messageService.add('Password and confirm password do not match.')
      return;
    }
    
    this.httpRequesterService.registerUser(this.model)
      .subscribe((loginUserModel: LoginUserModel) => {
        if (loginUserModel.success === true) {
          this.blogStoreService.registerUser(loginUserModel.username, loginUserModel.token);
        } else {
          this.messageService.add(loginUserModel.message);
        }
      });
  }

  ngOnInit() {
  }
};