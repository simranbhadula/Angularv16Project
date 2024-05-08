import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    AuthenticateWebUser(userData: any): Observable<any> {
        const url = `https://login.mymobiforce.com/userauthapi/api/Authenticate/AuthenticateWebUser`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(url, userData, { headers });
    }

    VerifyOTPWebUser(userOTPData: any): Observable<any> {
        const url = `https://login.mymobiforce.com/userauthapi/api/Authenticate/VerifyOTPWebUser`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(url, userOTPData, { headers, observe: 'response' });
    }

    validateLog(Token: any, UserId: any): Observable<any> {
        const url = `https://login.mymobiforce.com/coreapi/api/User/ByUserId`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Token': Token, 'UserId': UserId });

        return this.http.get(url, { headers, observe: 'response' });
    }

}