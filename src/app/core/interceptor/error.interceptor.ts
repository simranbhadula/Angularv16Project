import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(["Login"]); // Redirecting to the login page
            this.snackBar.open(
              "Unauthorized access. Please log in.",
              "Dismiss",
              {
                duration: 5000,
                verticalPosition: "top",
              }
            );
          } else if (err.status === 404) {
            // Handling Not Found error
            this.snackBar.open("Resource not found.", "Dismiss", {
              duration: 5000,
              verticalPosition: "top",
            });
          } else if (err.status === 500) {
            // Handling Internal Server Error
            this.snackBar.open(
              "Internal Server Error. Please try again later.",
              "Dismiss",
              {
                duration: 5000,
                verticalPosition: "top",
              }
            );
          } else {
            // Handling other types of errors
            this.snackBar.open(
              "An error occurred. Please try again later.",
              "Dismiss",
              {
                duration: 5000,
                verticalPosition: "top",
              }
            );
          }
          console.error("An error occurred:", err);
        }

        return new Observable<HttpEvent<any>>();
      })
    );
  }
}
