import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Res } from 'src/app/models/response.interface';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../login/login.component.scss'],
})
export class UsersComponent implements OnInit {
  hide: boolean = true;
  msgError: string = '';
  form_signup: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  signUp() {
    this.authService.signup(this.form_signup.value).subscribe(
      ({ data }) => {
        if (Number(data) > 0) {
          this.router.navigateByUrl('/login');
        }
      },
      (err: HttpErrorResponse) => {
        this.msgError = err.message;
      }
    );
  }
}
