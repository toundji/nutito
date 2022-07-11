import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { dataTableSettings } from 'src/utils/ui-constants';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '../../../utils/server-constants';
import Swal from 'sweetalert2';
import { swalDeleteConfirm } from '../../../utils/ui-constants';

@Component({
  selector: 'customers-component',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  dtOptions: DataTables.Settings = dataTableSettings
  customers: User[] = []
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.getCustomers()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  integers = Array.from({length: 10}, (_, i) => i + 1)

  getFormattedDate(date: string) {
    return formatDate(date)
  }

  getCustomers() {
    this.userService.getAll().subscribe(
      (data) => {
        console.log(data)
        this.customers = data.filter((user) => user.user_type !== "admin")
        this.dtTrigger.next();
      },
      (error: HttpErrorResponse) => {
        console.log()
      }
    )
  }

  deleteCustomer(customer: any) {
    Swal.fire(swalDeleteConfirm).then((result) => {
      if (result.isConfirmed) {
        this.customers.splice(this.customers.indexOf(customer), 1);
        this.userService.delete(customer).subscribe(
          (response) => {
            this.dtTrigger.next();
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      }
    });
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

  showCustomerDetail(customer: any) {
    localStorage.setItem("customer", JSON.stringify(customer))
    this.router.navigateByUrl("/dashboard/customer-detail")
  }

}
