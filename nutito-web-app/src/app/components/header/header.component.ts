import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout = () => {
    sessionStorage.clear()
    this.router.navigateByUrl("/login");
  }

  procceedToResetPasswordForm = () => {
    this.router.navigateByUrl("/reset-password")
  }

}
