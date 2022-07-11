import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { formatDate } from 'src/utils/server-constants';
import { dataTableSettings } from 'src/utils/ui-constants';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'dashboard-landing-component',
  templateUrl: './dashboard-landing.component.html',
  styleUrls: ['./dashboard-landing.component.css']
})
export class DashboardLandingComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  dtOptions: DataTables.Settings = dataTableSettings
  customers: User[] = []
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.getCustomers();
  }

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

}
