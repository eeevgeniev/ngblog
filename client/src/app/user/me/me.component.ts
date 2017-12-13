import { Component, OnInit } from '@angular/core';
import { HttpRequesterService } from '../../services/requester/http-requester.service';
import { User } from '../../models/users/user';
import { UserResponseModel } from '../../models/users/userResponseModel';
import { PasswordModel } from '../../models/users/passwordModel';
import { ResponseModel } from '../../models/responses/responseModel';
import { MessageService } from '../../services/messages/message.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  private model: User = { username: '', email: '' };
  private passwordModel: PasswordModel = { password: '', confirmPassword: '' };
  
  constructor(
    private httpRequestService: HttpRequesterService,
    private messageService: MessageService) { }

  onSubmit() {
    this.passwordModel.password = this.passwordModel.password.trim();
    this.passwordModel.confirmPassword = this.passwordModel.confirmPassword.trim();

    if (this.passwordModel.password.length < 4) {
      this.messageService.add('Password must be at least 4 characters.')
      return;
    }

    if (this.passwordModel.confirmPassword.length < 4) {
      this.messageService.add('Confirm password must be at least 4 characters.')
      return;
    }

    if (this.passwordModel.password !== this.passwordModel.confirmPassword) {
      this.messageService.add('Password and confirm password do not match.')
      return;
    }
    
    this.httpRequestService.updatePassword(this.passwordModel)
      .subscribe((responseModel: ResponseModel) => {
        if (responseModel.success === true) {
          this.messageService.add('Password updated.');
        } else {
          console.log(responseModel.message);
        }
      });
  }

  ngOnInit() {
    this.httpRequestService.getMe()
      .subscribe((userResponseModel: UserResponseModel) => {
        if (userResponseModel.success === true) {
          this.model = userResponseModel.user;
        } else {
          this.messageService.add(userResponseModel.message);
        }
      });
  }
}