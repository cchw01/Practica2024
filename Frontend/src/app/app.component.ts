import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from './app-logic/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Frontend';
  isDropdownVisible = false;
  name?: string;
  isLogged?: boolean;
  isAdmin?: boolean;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.localStorageService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLogged = isLoggedIn;
      this.name = isLoggedIn ? this.localStorageService.name : 'Guest';
    }));

    this.subscriptions.add(this.localStorageService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
    const dropdown = document.getElementById('user_dropdown');
    if (dropdown) {
      dropdown.style.display = this.isDropdownVisible ? 'flex' : 'none';
    }
  }

  goToProfile(): void {
    this.router.navigate(['/user-profile']);
  }

  logout(): void {
    this.localStorageService.logout();
    this.isLogged = false;
    this.isAdmin = false;
    this.name = 'Guest';
    this.router.navigate(['/login']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}
