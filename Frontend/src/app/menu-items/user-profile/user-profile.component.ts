import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../app-logic/services/user.service';
import { UserItem } from '../../app-logic/models/user-item';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userProfileForm = this.fb.group({
      userName: [''],
      userRole: [''],
      userId: [''],
      userEmail: [''],
      userPassword: [''], // Include the password field
      userTickets: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log('Loaded user data:', userData);
    this.userProfileForm.patchValue({
      userName: userData.name || '',
      userRole: userData.role || '',
      userId: userData.userId || '',
      userEmail: userData.emailAddress || '',
      userPassword: '', // Set password field to empty initially
      userTickets: userData.ticketList?.join(', ') || ''
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    if (this.userProfileForm.valid) {
      const updatedUserData = this.userProfileForm.value;
      this.loadUserData();
      const userItem: UserItem = {
        userId: parseInt(updatedUserData.userId, 10),
        name: updatedUserData.userName,
        role: updatedUserData.userRole,
        emailAddress: updatedUserData.userEmail,
        password: updatedUserData.userPassword || '', // Only include password if it is provided
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
        }
      });
    }
  }
}
