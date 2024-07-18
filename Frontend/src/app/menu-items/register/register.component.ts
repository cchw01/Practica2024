import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserItem } from '../../app-logic/models/user-item';
import { UserService } from '../../app-logic/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  user!: UserItem;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.minLength(10) && Validators.email],
      password: [''],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.user = new UserItem(this.registerForm.value);
      const hashedPassword = this.userService.hashPassword(this.user.password);
      this.user.password = hashedPassword;

      this.userService.addUser(this.user);
      this.router.navigate(['/' + this.user.userId]);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.registerForm != undefined)
      return this.registerForm.controls[controlName].hasError(errorName);
    return false;
  };
}
