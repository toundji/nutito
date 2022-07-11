import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { formatDate } from 'src/utils/server-constants';


@Component({
  selector: 'customer-info-component',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  customer: User 

  ngOnInit(): void {
    this.getCustomer()
  }

  getFormattedDate(date: string) {
    return formatDate(date)
  }

  getCustomer() {
    this.customer = JSON.parse(localStorage.getItem("customer")!)
  }

}
