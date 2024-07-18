import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent {
  isContentVisible = false;
  progress = 0;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      telefon: ['', Validators.required],
      ticketNumber: ['', Validators.required],
      flightNumber: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.updateProgress();
    });
  }

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  updateProgress() {
    const totalFields = Object.keys(this.form.controls).length;
    const filledFields = Object.keys(this.form.controls).filter(
      key => this.form.controls[key].valid
    ).length;
    this.progress = (filledFields / totalFields) * 100;
  }

  onSubmit() {
    if (this.form.valid) {
      // handle form submission
      console.log('Form submitted', this.form.value);
    }
  }
}
