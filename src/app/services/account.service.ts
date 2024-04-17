import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAuth } from '../models/user-auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiGatewayBaseUrl;

  private currentUserSource = new ReplaySubject<UserAuth | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  fetchCurrentUser(jwtToken: string | null){

    if (jwtToken === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${jwtToken}`);

    return this.http.get<UserAuth | null>(this.baseUrl + 'account/get-current-user', {headers}).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('jwtToken', user.token);
          this.currentUserSource.next(user);
          return user;
        } else {
          return null;
        }
      })
    )
  }

  login(values: any){
    return this.http.post<UserAuth>(this.baseUrl + "account/login", values).pipe(
      map( user => {
        localStorage.setItem('jwtToken', user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  register(values: any){
    return this.http.post<UserAuth>(this.baseUrl + "account/register", values).pipe(
      map( user => {
        localStorage.setItem('jwtToken', user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  logout(){
    localStorage.removeItem('jwtToken');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExistence(email: string){
    return this.http.get<boolean>(this.baseUrl + "account/email-exists" + "?email=" + email)
  }

  checkUsernameExistence(username: string){
    return this.http.get<boolean>(this.baseUrl + "account/username-exists" + "?username=" + username)
  }

  sendAccountConfirmationEmail(){
    let headers = new HttpHeaders();
    let token = localStorage.getItem('jwtToken');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post(this.baseUrl + "account/resend-account-confirmation-link", {body: {}}, {headers: headers});
  }

  sendPasswordChangeEmail(){
    let headers = new HttpHeaders();
    let token = localStorage.getItem('jwtToken');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post(this.baseUrl + "account/send-password-reset-link", {}, {headers: headers});
  }

  verifyAccount(userId: string, token: string){
    return this.http.get(this.baseUrl + "account/verify-email" + "?userId=" + userId + "&token=" + token, {});
  }

  changePassword(userId: string, token: string, newPassword: string){
    return this.http.post(this.baseUrl + "account/change-password", {userId: userId, token: token, newPassword: newPassword});
  }

}
