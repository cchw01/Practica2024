import { Component, ElementRef } from '@angular/core';
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
    private el: ElementRef,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      emailAddress: ['', Validators.minLength(10) && Validators.email],
      password: [''],
    });
  }

  ngOnInit() {
    const button = this.el.nativeElement.querySelector('.register_button');
    const airplaneImage =
      this.el.nativeElement.querySelector('.airplane_image');

    button.addEventListener('mouseenter', () => {
      airplaneImage.classList.add('animate');
    });

    button.addEventListener('mouseleave', () => {
      airplaneImage.classList.remove('animate');
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.user = new UserItem(this.registerForm.value);
      this.user.role = 'passenger';
      this.userService.register(this.user).subscribe({
        next: (registeredUser) => {
          console.log('User registered:', registeredUser);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        },
      });
    } else {
      alert('Please fill in the form correctly.');
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.registerForm != undefined)
      return this.registerForm.controls[controlName].hasError(errorName);
    return false;
  };
}
