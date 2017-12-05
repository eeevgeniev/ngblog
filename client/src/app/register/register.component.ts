import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/users/registerModel';
import { HttpRequesterService } from '../http-requester.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private model: RegisterModel = new RegisterModel('', '', '', '');
  
  constructor(private httpRequesterService: HttpRequesterService) { }

  onSubmit() {
    this.httpRequesterService.registerUser(this.model)
      .subscribe((res: {successful: boolean, message: string}) => {
        if (res) {
          if (res.successful) {
            console.log('Success');
          } else {
            console.log(res.message);
          }
        }
      });
  }

  ngOnInit() {
  }
}
