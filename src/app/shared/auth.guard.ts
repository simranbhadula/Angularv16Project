import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from "../core/service/auth.service";

@Injectable({ providedIn: 'root' })

export class authGuard  {
  protected http: HttpClient;
  userAuthState: boolean = false;
  constructor(private authService: AuthService,
    http: HttpClient) {
      this.http = http;
    }

}
