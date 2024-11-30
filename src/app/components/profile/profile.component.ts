import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { AuthCookieService } from '../../services/AuthCookie.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule],
})
export class ProfileComponent implements OnInit {
  userProfile: any = null; // Stores the user profile data
  userType: string | null = null; // Stores the user type
  error: string | null = null;
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private authCookieService: AuthCookieService
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    const userId = this.authCookieService.getCookie('userId'); // Retrieve userId from cookies
    const userType = this.authCookieService.getCookie('userType'); // Retrieve userType from cookies

    if (!userId) {
      this.error = 'User ID not found. Please log in.';
      this.isLoading = false;
      return;
    }

    this.userType = userType;

    this.apiService.getUserProfile(+userId).subscribe(
      (profile) => {
        this.userProfile = profile; // Store the profile data
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching profile:', error);
        this.error = 'Failed to fetch profile.';
        this.isLoading = false;
      }
    );
  }
}
