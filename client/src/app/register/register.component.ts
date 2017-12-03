import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/users/registerModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  private model = new RegisterModel('', '', '', '');
  
  constructor() { }

  onSubmit() {
    // to do
  }

  ngOnInit() {
  }
}
