import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from "../../service/token-storage.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router,
              private fb: FormBuilder,
              private toasrt: ToastrService,
              private tokenStorage: TokenStorageService
  ) {
  }

  result!: Observable<any>;
  // token = new Observable<any>();
  // token!: Observable<string>;
  email = '';
  password = '';
  loginForm!: FormGroup;
  alert = false;
  alert2 = false;

  ngOnInit(): void {
    // this.getToken();
    // console.log(this.result);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
    // console.log(this.loginForm.value);
  }

  error(): void {
    this.toasrt.warning('Password or email is incorrect!', 'Tải khoản hoặc mật khẩu sai!');
    // show box msg
    // this.alert = true;
    // // wait 3 Seconds and hide
    // setTimeout(function(this: any): void {
    //   this.alert = false;
    //   // console.log(this.edited);
    // }.bind(this), 3000);
    // @ts-ignore
    // this.router.navigate(['employees']);
  }

  success(): void {
    // show box msg
    // this.alert2 = true;
    // // wait 3 Seconds and hide
    // setTim eout(function(this: any): void {
    //   this.alert2 = false;
    //   // console.log(this.edited);
    // }.bind(this), 3000);
    // @ts-ignore
    this.toasrt.success('Login successfully', 'Đăng nhập thành công');
    setTimeout(() => {
      window.location.href = '/admin';

    }, 1000);
  }

  getToken(): void {
    const observer = this.loginService.login(this.email, this.password).subscribe(
      data => {
        // console.log(data);
        // console.log(data.token);
        this.result = data.token;
        this.tokenStorage.saveToken(data.token);
        this.success();
      },
      error => this.error()); // console.log(error)
    ;
  }

  onSubmit(): void {
    // console.log(this.loginForm.value);
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.getToken();
  }
}
