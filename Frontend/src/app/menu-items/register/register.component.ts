import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserItem } from '../../app-logic/models/user-item';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  user!: UserItem;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.minLength(10) && Validators.email],
      password: [''],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    this.user = new UserItem(this.registerForm.value);
    //this.item.id = this.inventoryListMockService.getLastId() + 1;
    //this.inventoryListMockService.addItem(this.item);
    //this.router.navigate(['/inventory']);
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.registerForm != undefined)
      return this.registerForm.controls[controlName].hasError(errorName);
    return false;
  };
}
