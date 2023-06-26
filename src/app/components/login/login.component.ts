import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GenericResponse} from "../../model/generic-response";
import {PatternValidations} from "../../validations/pattern-validations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userSession: string = 'session_x_token';

  loginForm!: FormGroup;
  showPassword = false;

  constructor(private authService: AuthService, private patternValidations: PatternValidations,
              private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });
  }

  login() {
    console.log('Logging in ****** ');

    const authRequest = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.authService.generateToken(authRequest).subscribe(data =>
      this.loginResponse(data)
    );
  }

  loginResponse(data: GenericResponse) {
    if (data.successful) {
      console.log(data.payload.token_data);
      this.storeToken(data.payload.token_data.token);
      console.log('Token from session: ' + sessionStorage.getItem(this.userSession));
      this.router.navigate(['gas-prices']).then(data => console.log('Data:: ' + data));
    } else {
      console.log('Failed to login.');
    }
  }

  storeToken(token: string) {
    if (token && typeof token === "string") {
      sessionStorage.setItem(this.userSession, token);
    } else {
      console.log('Failed to store token...');
    }
  }

  routeToSignup() {
    this.router.navigate(['user/register']).then(data => console.log(data));
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
