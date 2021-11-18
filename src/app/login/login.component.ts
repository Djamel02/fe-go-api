import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form_login: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  })

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.form_login.value)
    this.loginService.login(this.form_login.value).subscribe((token: string) => console.log(token), (err: HttpErrorResponse) => console.log(err.error))
  }

}
