import { Injectable } from '@angular/core';
import Axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../../config';
import { CookieService } from 'ngx-cookie-service';

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
    private cookies: CookieService
  ) {
    this.instance.interceptors.request.use(
      req => {
        let token = this.cookies.get("token")
        if (token) {
          req.headers.Authorization = `Bearer ${token}`
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

  get api() {
    return this.instance;
  }
}
