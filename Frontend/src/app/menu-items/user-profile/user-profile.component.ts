import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../app-logic/services/user.service';
import { UserItem } from '../../app-logic/models/user-item';
import { TicketItem } from '../../app-logic/models/ticket-item';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../app-logic/services/local-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  isEditing: boolean = false;
  tickets!: TicketItem[];
  userTickets: TicketItem[] = [];
  userData: any;

  currentSlide: number = 0;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.userForm = this.fb.group({
      name: [{ value: '' }, [Validators.required]],
      role: [{ value: '' }, [Validators.required]],
      email: [{ value: '' }, [Validators.required]],
      password: [{ value: '' }], // Include the password field
    });
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.loadUserData();
  }

  loadUserData(): void {
    console.log('Loaded user data:', this.userData);
    this.userForm.patchValue({
      name: this.userData.name || '',
      email: this.userData.emailAddress || '',
      password: '', // Set password field to empty initially
    });
    this.loadUserTickets(this.userData.userId);
  }
  loadUserTickets(userId: number): void {
    this.userService.getUserTickets(userId).subscribe({
      next: (tickets) => {
        this.userTickets = tickets;
        console.log('Loaded user tickets:', this.userTickets); // Check the console log for the correct data structure
      },
      error: (error) => {
        console.error('Failed to load tickets:', error);
      },
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    if (this.userForm.valid) {
      this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const updatedUserData = this.userForm.value;
      let pw = '';
      if (updatedUserData.password != '')
        pw = this.userService.hashPassword(updatedUserData.password);
      const userItem: UserItem = {
        userId: this.userData.userId,
        name: updatedUserData.name,
        role: this.userData.role,
        emailAddress: updatedUserData.email,
        password: pw,
      };

      console.log('Updating user with data:', userItem);

      this.userService.updateUser(userItem).subscribe({
        next: (updatedUser) => {
          console.log('User updated:', updatedUser);
          this.localStorageService.updateUserData(userItem);
          this.isEditing = false;
          alert('Profile updated successfully');
        },
        error: (error) => {
          console.error('Update failed:', error);
          alert('Failed to update profile');
        },
      });
      if (this.userForm.value.password != '') this.router.navigate(['/login']);
    }
  }
  public hasError = (controlName: string, errorName: string) => {
    if (this.userForm != undefined)
      return this.userForm.controls[controlName].hasError(errorName);
    return false;
  };

  getTransform(): string {
    return `translateX(-${this.currentSlide * 33.33}%)`;
  }

  prevSlide() {
    this.currentSlide =
      this.currentSlide > 0
        ? this.currentSlide - 1
        : this.userTickets.length - 3;
  }

  nextSlide() {
    this.currentSlide =
      this.currentSlide < this.userTickets.length - 3
        ? this.currentSlide + 1
        : 0;
  }
}
