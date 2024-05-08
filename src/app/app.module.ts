import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule,MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './core/service/user.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './core/service/auth.service';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, MatSnackBarModule,NgOtpInputModule, BrowserAnimationsModule,HttpClientModule],
  declarations: [AppComponent, LoginComponent, DashboardComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { verticalPosition: 'top' } },UserService,AuthService]
  
})
export class AppModule { }
