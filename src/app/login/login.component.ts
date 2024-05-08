import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { authGuard } from '../shared/auth.guard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;



  userData: any;
  userOTPData: any;
  email: any;
  password: any;
  otp = '';
  userAuthToken = '';
  Token = '';
  UserId = '';
  resendTimer: any = null;
  resendTimerValue: number = 0;
  isOTPScreen: boolean = false;
  userAuthUserId: any;
  rocketAuthToken: any;
  rocketUserId: any;
  twoFactoruser: any;
  userCompleteData: any;
  userInfo: any;
  constructor(private user: UserService, private snackBar: MatSnackBar, private fb: FormBuilder, private router: Router, private authGuard: authGuard) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  startResendTimer() {
    this.clerTimer();
    this.resendTimerValue = 30;
    this.resendTimer = setInterval(() => {
      if (this.resendTimerValue > 0) --this.resendTimerValue;
    }, 1000);
  }

  ngOnDestroy() {
    this.clerTimer();
  }

  clerTimer() {
    this.resendTimerValue = 0;
    this.resendTimer && clearInterval(this.resendTimer);
  }

  onOtpChange(otp: any) {
    this.otp = otp;
  }
  onBack() {
    this.isOTPScreen = false;
  }

  onLoginEmail() {
    this.userData = {
      UserId: this.email,
      Password: this.password
    };
    this.user.AuthenticateWebUser(this.userData).subscribe({
      next: response => {
        if (response == 'Valid') {
          this.snackBar.open('OTP Sent to registered Email or Mobile No. Successfully', 'Close', { duration: 2000, verticalPosition: 'top' });
          this.isOTPScreen = true;
          this.startResendTimer();
        } else {
          this.snackBar.open(response, 'Close', { duration: 2000, verticalPosition: 'top' });
        }
      },
      error: err => {
        this.snackBar.open('Login failed. Please check your credentials and try again.', 'Close', { duration: 2000, verticalPosition: 'top' });
      }
    }
    );
  }


  onLogin() {
    this.userOTPData = {
      "UserId": this.email,
      "Password": this.otp
    };
    this.user.VerifyOTPWebUser(this.userOTPData)
      .subscribe({
        next: userData => {
          const Token = userData.headers.get('Token');
          const UserId = userData.headers.get('UserId');
          const rocketAuthToken = userData.headers.get('Rocket-AuthToken');
          const rocketUserId = userData.headers.get('Rocket-UserId');
          localStorage.setItem('Token', Token);
          localStorage.setItem('UserId', UserId);
          localStorage.setItem('rocketAuthToken', rocketAuthToken);
          localStorage.setItem('rocketUserId', rocketUserId);
          this.userInfo = userData.body;
          this.user.validateLog(Token, UserId).subscribe({
            next: userCompleteInfo => {
              this.userCompleteData = userCompleteInfo.body;
              if (this.userCompleteData && this.userCompleteData.UserStatus == 'Active') {
                localStorage.setItem('AccountConfig', this.userCompleteData.accountConfig);
                localStorage.setItem('Role', this.userCompleteData.Role);
                localStorage.setItem('UserType', this.userCompleteData.UserType);
                localStorage.setItem('ReportingTo', this.userCompleteData.ReportingTo);
                localStorage.setItem('FirstName', this.userCompleteData.FirstName);
                localStorage.setItem('LastName', this.userCompleteData.LastName);
                localStorage.setItem('ContactNumber', this.userCompleteData.ContactNumber);
                localStorage.setItem('IsOpenBucketEnabled', this.userCompleteData.IsOpenBucketEnabled);
                localStorage.setItem('IsProfileActivationRights', this.userCompleteData.IsProfileActivationRights);
                localStorage.setItem('IsAutoAssignToCHDteam', this.userCompleteData.IsAutoAssignToCHDteam);
                localStorage.setItem('Picture', this.userCompleteData.Picture);
                localStorage.setItem('loggedInUser_SkillSet', this.userCompleteData.SkillSet);
                this.snackBar.open('Login successful!', 'Close', { duration: 2000, verticalPosition: 'top' });
                this.router.navigate(['/Dashboard']);
              }
            },
            error: err => {
              this.snackBar.open(err.error.Message, 'Close', { duration: 2000, verticalPosition: 'top' });
            }
          });
        },
        error: err => {
          this.handleErrorResponse(err);
        }
      });
  }



  private handleErrorResponse(response: any) {
    switch (response.error.ErrorCode) {
      case 115:
        this.snackBar.open('Invalid username or password', 'Close', { duration: 2000, verticalPosition: 'top' });
        break;
      case 114:
        this.snackBar.open('User is not active', 'Close', { duration: 2000, verticalPosition: 'top' });
        break;
      case 102:
        this.snackBar.open('Invalid OTP', 'Close', { duration: 2000, verticalPosition: 'top' });
        break;
      case 401:
        this.snackBar.open('Unauthorized access', 'Close', { duration: 2000, verticalPosition: 'top' });
        break;
      default:
        this.snackBar.open('Error occurred while logging in', 'Close', { duration: 2000, verticalPosition: 'top' });
        break;
    }
  }
}

