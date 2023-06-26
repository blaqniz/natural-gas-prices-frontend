import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GenericResponse} from "../../model/generic-response";
import {RegistrationService} from "../../services/registration.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;
  userSession: string = 'session_x_token';
  showPassword = false;

  constructor(private registrationService: RegistrationService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });
  }

  registerUser() {
    console.log('Signing up ****** ');

    const authRequest = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value
    };

    this.registrationService.registerUser(authRequest).subscribe(data =>
      this.registrationResponse(data)
    );
  }

  registrationResponse(data: GenericResponse) {
    if (data.successful) {
      this.router.navigate(['login']).then(data => console.log('Data:: ' + data));
    } else {
      console.log('Failed to register.');
    }
  }

  storeToken(token: string) {
    if (token && typeof token === "string") {
      sessionStorage.setItem(this.userSession, token);
    } else {
      console.log('Failed to store token...');
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
