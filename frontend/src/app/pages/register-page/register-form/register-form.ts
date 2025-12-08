import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'register-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm implements OnInit{
  registerForm;
  passwordsDidNotMatch = false;
  returnUrl: string | null = null;
  route = inject(ActivatedRoute)
  constructor(private readonly router: Router, private readonly fb: FormBuilder, private readonly http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeat_password: ['',[Validators.required]]
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['redirectTo'] || null;
  }


  onSubmit() {
    if(this.registerForm.invalid) return;
    const passwordField = this.registerForm.get('password');
    const repeatPasswordField = this.registerForm.get('repeat_password');
    if(passwordField?.value!==repeatPasswordField?.value){
      repeatPasswordField?.setValue('');
      this.passwordsDidNotMatch = true;
      return;
    }

    this.http.post(environment.apiUrl+'/auth/register', this.registerForm.value, {withCredentials: true}).subscribe({
      next: () => {
        if(this.returnUrl === null){
          this.router.navigate(['/login']);
        }else{
          this.router.navigate(['/login'], {queryParams: {redirectTo: this.returnUrl}});
        }

      },
      error: (error) => {
        globalThis.alert('Failed to register user. Error: '+ (error.body?.toString() ?? 'empty body')+' status: '+error.status);
      }
    })
  }

  onRepeatPasswordFocus() {
    this.passwordsDidNotMatch = false;
  }
}
