import { Component, OnInit } from '@angular/core';
import { formatDate } from '../../../utils/server-constants';
import { CompanyService } from '../../services/company.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
declare var setButtonBehavior: any

@Component({
  selector: 'customer-detail-component',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) { }

  customer: User = new User()
  companies: any = []

  ngOnInit(): void {
    setButtonBehavior()
    this.customer = JSON.parse(localStorage.getItem("customer")!)
    this.getCompanies()
  }

  integers = Array.from({length: 10}, (_, i) => i + 1)

  getFormatedDate(date: string) {
    return formatDate(date)
  }

  getCompanies() {
    this.companies = this.customer.companies
  }

  deleteCustomer(customer: any) {

  }

  showCompanyDetails(company: any) {
    localStorage.setItem("company", JSON.stringify(company))
    this.router.navigateByUrl("/dashboard/company-detail")
  }

}
