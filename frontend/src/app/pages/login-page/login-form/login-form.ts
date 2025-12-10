import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'login-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm implements OnInit{
  private readonly router: Router;
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl: string = '/main-page';
  private readonly route = inject(ActivatedRoute);

  constructor(private fb: FormBuilder, private http: HttpClient, router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.router=router;
  }

  ngOnInit(){
    this.returnUrl = this.route.snapshot.queryParams['redirectTo'] || '/main-page';
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';


    this.http.post(environment.apiUrl+'/auth/login', this.loginForm.value, {withCredentials: true}).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (error) => {
        this.errorMessage = 'Niepoprawny email lub hasło';
        this.isLoading = false;
      }
    });
  }
}
