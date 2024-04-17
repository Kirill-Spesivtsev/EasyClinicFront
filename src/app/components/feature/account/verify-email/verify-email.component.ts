import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router,
    private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe(params => {
        const token = params['token'];
        const userId = params['userId'];
        this.accountService.verifyAccount(userId, token).subscribe({
          next: response => {
            this.toastr.success("Your account has been verified!", 'Success');
            this.router.navigateByUrl('/account');
          },
          error: error => {
            console.log(error);
            this.toastr.error("User or token is invalid. Account was not verified!", 'Error');
          }
        })
    });
  }

}
