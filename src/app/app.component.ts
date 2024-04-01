import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private accoutService: AccountService){}

  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  fetchCurrentUser(){
    const jwtToken = localStorage.getItem('jwtToken');
    this.accoutService.fetchCurrentUser(jwtToken).subscribe();
  }

}