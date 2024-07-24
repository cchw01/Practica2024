import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../app-logic/services/user.service';
import { UserItem } from '../../app-logic/models/user-item';
import { TicketItem } from '../../app-logic/models/ticket-item';
import { Observable } from 'rxjs';

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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: [{ value: '' }, [Validators.required]],
      role: [{ value: '' }, [Validators.required]],
      email: [{ value: '' }, [Validators.required]],
      password: [{ value: '' }, [Validators.required]], // Include the password field
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
      role: this.userData.role || '',
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
      const updatedUserData = this.userForm.value;
      const userItem: UserItem = {
        userId: this.userData.id,
        name: updatedUserData.name,
        role: updatedUserData.role,
        emailAddress: updatedUserData.email,
        password: this.userService.hashPassword(updatedUserData.password) || '', // Only include password if it is provided
      };

      console.log('Updating user with data:', userItem);

      this.userService.updateUser(userItem).subscribe({
        next: (updatedUser) => {
          console.log('User updated:', updatedUser);
          localStorage.setItem('userData', JSON.stringify(updatedUser));
          this.isEditing = false;
          alert('Profile updated successfully');
        },
        error: (error) => {
          console.error('Update failed:', error);
          alert('Failed to update profile');
        },
      });
    }
  }
  public hasError = (controlName: string, errorName: string) => {
    if (this.userForm != undefined)
      return this.userForm.controls[controlName].hasError(errorName);
    return false;
  };
}
