import { Component, OnInit } from '@angular/core';
import { dataTableSettings } from '../../../utils/ui-constants';

@Component({
  selector: 'agents-roles-list-component',
  templateUrl: './agents-roles-list.component.html',
  styleUrls: ['./agents-roles-list.component.css']
})
export class AgentsRolesListComponent implements OnInit {

  constructor() { }

  initialiseDatatable() {
    let datatable = document.querySelector(".datatable") as any
    if (datatable.length && datatable.DataTable()) {
      datatable.DataTable().destroy()
      datatable.DataTable(dataTableSettings as any);
    }
  }

  ngOnInit(): void {

  }

}
