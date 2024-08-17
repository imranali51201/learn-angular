import { Injectable } from '@angular/core';
import Axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../../config';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';
import { isTokenExpired } from '../../helpers/helpers.service';
import { LoginResponse } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private instance: AxiosInstance = Axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": 'application/json'
    }
  })

  constructor(
    private cookies: CookieService,
  ) {
    this.instance.interceptors.request.use(
      async (req) => {
        if (req.url !== "/auth/refresh") {
          let token = await this.getToken()
          if (token) {
            req.headers.Authorization = `Bearer ${token}`
          }
        }
        return req
      },
      err => err
    )
    this.instance.interceptors.response.use(
      res => res,
      err => {
        err.message = err.response.data.message || err.message || "Something went wrong!"
        return Promise.reject(err)
      }
    )
  }

  async getToken() {
    let _token = this.cookies.get("token")
    if (_token && isTokenExpired(_token)) {
      const { data } = await this.instance.post<LoginResponse>("/auth/refresh", {
        refreshToken: this.cookies.get("refreshToken")
      })
      this.cookies.set("token", data.token);
      this.cookies.set("refreshToken", data.refreshToken);
      _token = data.token
    }
    return _token;
  }

  get api() {
    return this.instance;
  }
}
