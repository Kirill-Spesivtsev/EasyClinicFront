import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  
  constructor(protected accountService : AccountService, private toastr: ToastrService){}
  
  ngOnInit(): void {

  }

  logout(): void {
    this.accountService.logout();
  }

  sendAccountConfirmationEmail(){
    this.accountService.sendAccountConfirmationEmail().subscribe({
      next: () => {
        this.toastr.success("Account confirmation link was sent to your email", "Success");
      },
      error: error => console.log(error)
    })
  }

  sendPasswordChangeEmail(){
    this.accountService.sendPasswordChangeEmail().subscribe({
      next: () => {
        this.toastr.success("Password change link was sent to your email", "Success");
      },
      error: error => console.log(error)
    })
  }



}
