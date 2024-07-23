import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './app-logic/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  isDropdownVisible = false;
  name?: string;
  isLogged?: boolean;
  isAdmin?: boolean;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['reload']) {
        this.initializeComponent();
      }
    });
  }

  initializeComponent() {
    this.name = this.localStorageService.name
      ? this.localStorageService.name
      : 'Guest';
    this.isLogged = this.localStorageService.isLoggedIn;
    this.isAdmin = this.localStorageService.isAdmin;
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
    const dropdown = document.getElementById('user_dropdown');
    if (dropdown) {
      dropdown.style.display = this.isDropdownVisible ? 'flex' : 'none';
    }
  }

  goToProfile() {
    this.router.navigate(['/user-profile']);
  }

  logout() {
    this.localStorageService.logout();
    this.initializeComponent();
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
