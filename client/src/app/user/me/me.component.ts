import { Component, OnInit } from '@angular/core';
import { HttpRequesterService } from '../../http-requester.service';
import { User } from '../../models/users/user';
import { UserResponseModel } from '../../models/users/userResponseModel';
import { PasswordModel } from '../../models/users/passwordModel';
import { ResponseModel } from '../../models/responses/responseModel';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  private model: User = { username: '', email: '' };
  private passwordModel: PasswordModel = { password: '', confirmPassword: '' };
  
  constructor(private httpRequestService: HttpRequesterService) { }

  onSubmit() {
    this.httpRequestService.updatePassword(this.passwordModel)
      .subscribe((responseModel: ResponseModel) => {
        if (responseModel.success) {

        } else {
          console.log(responseModel.message);
        }
      });
  }

  ngOnInit() {
    this.httpRequestService.getMe()
      .subscribe((userResponseModel: UserResponseModel) => {
        if (userResponseModel.success) {
          this.model = userResponseModel.user;
        } else {
          console.log(this.model);
        }
      });
  }
}