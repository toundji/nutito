import { Component, OnInit } from '@angular/core';
import { dataTableSettings } from "../../../utils/ui-constants";
import { AgentRoleService } from '../../services/agent-role.service';
import { AgentRole } from '../../models/agent-role.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import "animate.css"
import Swal from 'sweetalert2';
import { CompanyCategory } from '../../models/company-category.model';
import { CompanyCategoryService } from 'src/app/services/company-category.service';

@Component({
  selector: 'company-categories-list-component',
  templateUrl: './company-categories-list.component.html',
  styleUrls: ['./company-categories-list.component.css']
})
export class CompanyCategoriesListComponent implements OnInit {

  constructor(private companyCategoryService: CompanyCategoryService) { }

  companyCategories: CompanyCategory[] = [];

  dtOptions: DataTables.Settings = dataTableSettings

  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.getCompanyCategories()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getCompanyCategories() {
    this.companyCategoryService.getAll().subscribe(
      (data) => {
        this.companyCategories = data
        this.dtTrigger.next();
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }


  deleteCompanyCategory(companyCategory: CompanyCategory) {
    Swal.fire({
      title: 'Êtes vous sûr ?',
      text: "Voulez-vous vraiment procéder à la suppression de cet élément ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Annuler",
      confirmButtonText: "Supprimer l'élément",
      showClass: {
          popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyCategories.splice(this.companyCategories.indexOf(companyCategory), 1);
        this.companyCategoryService.delete(companyCategory).subscribe(
          (response) => {
            console.log(response);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      }
    });
  }

}
