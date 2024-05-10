import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) { }
  logout(){
    const confirmation = confirm("do you want to logout");
    if(confirmation){
      localStorage.removeItem('Token');
      this.router.navigate(['Login']);
    }
  }

}