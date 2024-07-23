import { Injectable } from '@angular/core';
import { UserItem } from '../models/user-item';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly USER_DATA_KEY = 'userData';

  constructor() {}

  get userData(): any {
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    return userData ? (JSON.parse(userData) as UserItem) : null;
  }

  get userId(): number | null {
    const user = this.userData;
    return user ? user.userId : null;
  }

  get name(): string | null {
    const user = this.userData;
    return user ? user.name : null;
  }

  get role(): string | null {
    const user = this.userData;
    return user ? user.role : null;
  }

  get emailAddress(): string | null {
    const user = this.userData;
    return user ? user.emailAddress : null;
  }

  logout(): void {
    localStorage.removeItem(this.USER_DATA_KEY);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.USER_DATA_KEY);
  }

  get isAdmin(): boolean {
    return this.role == 'admin';
  }
}
