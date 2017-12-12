import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../models/users/registerModel';
import { HttpRequesterService } from '../../http-requester.service';
import { LoginUserModel } from '../../models/users/loginUserModel';
import { BlogStoreService } from '../../blog-store.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private model: RegisterModel = new RegisterModel('', '', '', '');
  
  constructor(
    private httpRequesterService: HttpRequesterService, 
    private blogStoreService: BlogStoreService,
    private messageService: MessageService) { }

  onSubmit(): void {
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