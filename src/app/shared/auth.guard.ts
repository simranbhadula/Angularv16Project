import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivateFn } from "@angular/router";

// @Injectable({ providedIn: 'root' })

export const authGuard: CanActivateFn = (route, state) =>{ debugger
  const Token = localStorage.getItem('Token');
  const router = Inject(Router);
  if(Token){

    return true
  }
  else{
    router.navigate(['Login']);
    return false;
  }
}
