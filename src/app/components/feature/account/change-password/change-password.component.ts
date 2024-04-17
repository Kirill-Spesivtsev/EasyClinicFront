import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  
  constructor(private accountService: AccountService, private router: Router,
    private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

    passwordChangeForm = new FormGroup({
      newPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });

  token?: string;
  userId?: string;

  ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe(params => {
        this.userId = params['userId'];
        this.token = params['token'];
    });
    this.passwordChangeForm.get('repeatPassword')?.addValidators(this.validatePasswordMatching());
  }

  validatePasswordMatching() : ValidatorFn{
    return (control: AbstractControl) : ValidationErrors | null => {
      return this.passwordChangeForm.get('newPassword')?.value != this.passwordChangeForm.get('repeatPassword')?.value ?
        {passwordsMatch: true}
        : null;
    }
  }

  changePasswordSubmit() {
    if (this.passwordChangeForm.valid){
      this.sendPasswordChangeRequest();
    }
    else{
      this.populateFormErrors();
    }
  }

  sendPasswordChangeRequest(){
    const pass = this.passwordChangeForm.get('newPassword')?.value;
    this.accountService.changePassword(this.userId ?? "", this.token ?? "", pass ?? "").subscribe({
      next: response => {
        this.toastr.success("Your password has been changed!", 'Success');
        this.router.navigateByUrl('/account');
      },
      error: error => {
        console.log(error);
        this.toastr.error("User or token is invalid. Password was not changed!", 'Error');
      }
    })
  }

  populateFormErrors() {
    this.passwordChangeForm.get('newPassword')?.markAsTouched();
    this.passwordChangeForm.get('repeatPassword')?.markAsTouched();
  }

}
