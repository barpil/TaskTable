import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'register-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm {
  registerForm;
  constructor(private readonly router: Router, private readonly fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeat_password: ['',[Validators.required]]
    });
  }

  isFieldInvalid(fieldName: string){
    return this.registerForm.get(fieldName)?.invalid &&
      this.registerForm.get(fieldName)?.dirty &&
      this.registerForm.get(fieldName)?.touched
  }


  onSubmit() {
    console.log(this.registerForm.value)
  }
}
