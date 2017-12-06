import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/users/loginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private model: LoginModel = new LoginModel('', '');
  
  constructor() { }

  ngOnInit() {
  }

  onSubmit(): void {
    // to do
  }
};