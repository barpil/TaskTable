import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'login-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  private readonly router: Router;
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.router=router;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';


    this.http.post(environment.apiUrl+'/auth/login', this.loginForm.value, {withCredentials: true}).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/main-page'])
      },
      error: (error) => {
        this.errorMessage = 'Niepoprawny email lub hasło';
        this.isLoading = false;
        globalThis.alert('Błąd logowania: '+ (error.body?.toString() ?? 'empty body')+' status: '+error.status)
      }
    });
  }
}
