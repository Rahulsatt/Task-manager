import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, IonText, IonInput, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonInput, IonText, IonButton, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistrationPage implements OnInit {
  registrationForm!: FormGroup;
  captchaText: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.captchaText = this.generateCaptcha(); // Generate captcha text

    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, this.nameValidator()]], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator()]],
      confirmPassword: ['', Validators.required],
      captcha: ['', Validators.required]
    }, { validators: this.confirmPasswordValidator });
  }

  // Function to generate random captcha
  generateCaptcha(): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
  }

  // Custom Validator for Name - Only alphabets allowed
  nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-Z\s]+$/.test(control.value); // Only letters and spaces
      return valid ? null : { invalidName: { value: control.value } };
    };
  }

  // Custom Validator for Password - Alphanumeric with special characters and min length 6
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(control.value);
      return valid ? null : { invalidPassword: { value: control.value } };
    };
  }

  // Custom Validator to check if Password and Confirm Password fields match
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Submitted:', this.registrationForm.value);
    } else {
      console.log('Form is not valid.');
    }
  }
}
