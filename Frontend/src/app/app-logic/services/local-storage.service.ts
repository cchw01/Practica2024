import { Injectable } from '@angular/core';
import { UserItem } from '../models/user-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly USER_DATA_KEY = 'userData';
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.checkIsLoggedIn()
  );
  private isAdminSubject = new BehaviorSubject<boolean>(this.checkIsAdmin());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor() {}

  private checkIsLoggedIn(): boolean {
    return !!localStorage.getItem(this.USER_DATA_KEY);
  }

  private checkIsAdmin(): boolean {
    const userData = this.userData;
    return userData && userData.role === 'admin';
  }

  get userData(): any {
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    return userData ? (JSON.parse(userData) as UserItem) : null;
  }

  get userId(): number | null {
    const user = this.userData;
    return user ? user.userId : null;
  }

  get name(): string {
    const user = this.userData;
    return user ? user.name : '';
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

  storeUserData(user: UserItem): void {
    const { password, ...userDetails } = user;
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userDetails));
    this.isLoggedInSubject.next(true);
    this.isAdminSubject.next(user.role === 'admin');
  }

  updateUserData(user: UserItem): void {
    localStorage.removeItem(this.USER_DATA_KEY);
    const { password, ...userDetails } = user;
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userDetails));
    this.isLoggedInSubject.next(true);
    this.isAdminSubject.next(user.role === 'admin');
  }
}
