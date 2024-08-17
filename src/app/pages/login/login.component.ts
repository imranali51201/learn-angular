import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [NzCardModule, NzFormModule, NzInputModule, NzCheckboxModule, NzButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginPage {
  private auth = inject(AuthService)
  isLoading = false;

  loginForm = new FormGroup({
    email: new FormControl('emilys', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('emilyspass', { nonNullable: true, validators: [Validators.required] }),
    remember: new FormControl(true, { nonNullable: true }),
  });

  async submitForm() {
    this.isLoading = true;
    const values = this.loginForm.getRawValue();
    await this.auth.login(values)
    this.isLoading = false;
  }
}
