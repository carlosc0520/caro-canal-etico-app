import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "src/resources/services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/panel']);
      return false;
    }
    return true;
  }
}
