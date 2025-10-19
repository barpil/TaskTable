import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';

@Component({
  selector: 'login-form',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';


    this.http.post('http://localhost:8080/api/auth/login', this.loginForm.value, {observe: 'response'}).subscribe({
      next: (response) => {
        this.isLoading = false;
        globalThis.alert('Zalogowano pomyślnie: '+ (response.body?.toString() ?? 'empty body')+' status: '+response.status)
      },
      error: (error) => {
        this.errorMessage = 'Niepoprawny email lub hasło';
        this.isLoading = false;
        globalThis.alert('Błąd logowania: '+ (error.body?.toString() ?? 'empty body')+' status: '+error.status)
      }
    });
  }
}
