import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';
import { lastValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(DatabaseService);
  const router = inject(Router);

  try {
    const isAuthenticated = await lastValueFrom(authService.isAuthenticated()); // Convert observable to promise
    if (isAuthenticated == true) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } catch (error) {
    // Handle any potential error (for example, network issues or authentication errors)
    console.error('Error during authentication guard', error);
    router.navigate(['/login']);
    return false;
  }
};