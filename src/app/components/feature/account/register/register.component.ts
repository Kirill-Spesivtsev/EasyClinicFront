import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  constructor(private accountService: AccountService,
    private router: Router, private toastr: ToastrService){}

  errors?: string[] = undefined; 

  emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)], this.CheckEmailAvailability()),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    repeatPassword: new FormControl("", [Validators.required]),
  },
  {
    validators: this.repeatPasswordValidator()
  });

  loadingUsername: boolean = false;
  loadingEmail: boolean = false;


  onSubmit(){
    if (this.registerForm.valid){
        this.accountService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigateByUrl('/products')
          this.toastr.success("Please confirm your account using the link sent to your email", "Your Account was created");
        },
        error: error => this.populateAsyncFormErrors(error)
      })
    }
    else{
      this.populateFormErrors();
    }
  }

  repeatPasswordValidator(): ValidatorFn {
    return (formGroup: AbstractControl<any, any>) : ValidationErrors | null => {
          const password = formGroup.get("password");
          const repeatPassword = formGroup.get("repeatPassword");
  
          if (password!.value !== repeatPassword!.value)
            return { passwordMismatch: true }
          else 
            return null;
      }
    }

  populateFormErrors() {
    this.registerForm.get('email')?.markAsTouched();
    this.registerForm.get('password')?.markAsTouched();
    this.registerForm.get('repeatPassword')?.markAsTouched();
  }

  populateAsyncFormErrors(error: any) {
    if (error.errors) {
      this.errors = Object.keys(error.errors).map(function(key){
        return error.errors[key];
      });
    } else {
      if (error.detail) {
        this.errors = [error.detail];
      }
    }
  }

  CheckEmailAvailability(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          this.loadingEmail = true
          return this.accountService.checkEmailExistence(control.value).pipe(
            map(result => result ? {emailTaken: true} : null),
            finalize(() => {this.loadingEmail = false; control.markAsTouched();})
          )
        })
      ) 
    }
  }

  CheckUsernameAvailability(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1200),
        take(1),
        switchMap(() => {
          this.loadingUsername = true
          return this.accountService.checkUsernameExistence(control.value).pipe(
            map(result => result ? {usernameTaken: true} : null),
            finalize(() => {this.loadingUsername = false; control.markAsTouched();})
          )
        })
      )
    }
  }

}
