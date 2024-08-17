import { Inject, inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api/api.service';
import { LoginInput, LoginResponse } from '../../models/auth.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  user: IUser | null = null;
  message = inject(NzMessageService)
  apiService = inject(ApiService)

  constructor(
    private router: Router,
    private cookies: CookieService,
  ) {
  }

  async checkAuthentication(): Promise<boolean> {
    const token = this.cookies.get("token");
    if (!!token) {
      await this.fetchUser();
    }
    this.isAuthenticated = !!token;
    return !!token;
  }

  async fetchUser() {
    this.user = (await this.apiService.api.get<IUser>("/user/me")).data
  }

  async login(props: LoginInput) {
    try {
      const { data } = await this.apiService.api.post<LoginResponse>("/auth/login", {
        username: props.email,
        password: props.password,
        expiresInMins: 1
      });
      this.cookies.set("token", data.token);
      this.cookies.set("refreshToken", data.refreshToken);
      await this.fetchUser();
      this.isAuthenticated = !!data.token;
      this.router.navigateByUrl("/");
    } catch (error: any) {
      this.message.error(error.message);
    }
  }

  logout() {
    this.cookies.delete("token");
    this.isAuthenticated = false;
    this.router.navigateByUrl("/login");
  }
}
