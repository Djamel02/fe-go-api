import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form_login: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  hide: boolean = true;
  errMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.loginService.login(this.form_login.value).subscribe(
      (token: string) => {
        localStorage.setItem('token', token);
        this.router.navigate(['']);
      },
      (err: HttpErrorResponse) => {
        this.errMessage = err.error?.message;
      }
    );
  }
}
