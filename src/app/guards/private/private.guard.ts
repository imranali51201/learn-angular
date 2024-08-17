import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async canActivate(): Promise<boolean> {
    if (await this.authService.checkAuthentication()) {
      return true; 
    } else {
      this.router.navigateByUrl('/login'); 
      return false; 
    }
  }
}
