import { Component, OnInit } from '@angular/core';
import { formatDate } from '../../../utils/server-constants';
import { CompanyService } from '../../services/company.service';
import { User } from 'src/app/models/user.model';
import { Company } from '../../models/company.model';
declare var setButtonBehavior: any

@Component({
  selector: 'company-details-component',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  constructor(
    private companyService: CompanyService
  ) { }

  company: Company = new Company()

  ngOnInit(): void {
    
  }

  integers = Array.from({length: 10}, (_, i) => i + 1)

  getFormatedDate(date: string) {
    return formatDate(date)
  }


  deleteCustomer(customer: any) {

  }

}
