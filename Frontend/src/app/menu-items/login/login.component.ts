import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      if (email === 'test@example.com' && password === 'password') {
  
        //this.authService.login({ email });
        this.router.navigate(['']);
      } else {

        alert('Invalid email or password');
      }
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.loginForm != undefined)
      return this.loginForm.controls[controlName].hasError(errorName);
    return false;
  };

}
