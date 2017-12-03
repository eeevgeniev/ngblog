import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/users/loginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private model = new LoginModel('', '');
  
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    // to do
  }
};