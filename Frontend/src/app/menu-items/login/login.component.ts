import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../app-logic/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.userService.login(email, password).subscribe({
        next: (user) => {
          this.userService.storeUserData(user);
          this.router.navigate([''], {
            queryParams: { reload: new Date().getTime() },
          });
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Invalid email or password');
        },
      });
    } else {
      alert('Please enter valid email and password');
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.loginForm != undefined)
      return this.loginForm.controls[controlName].hasError(errorName);
    return false;
  };
}
