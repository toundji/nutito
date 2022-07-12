import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { AuthGuard } from './guards/auth.guard';
import { DashboardGuard } from './guards/dashboard.guard';
import { DashboardLandingPage } from './pages/dashboard-landing/dashboard-landing.page';
import { MainPage } from './pages/main/main.page';
import { PasswordResetPage } from './pages/reset-password/reset-password.page';
import { NutitoCapitalPage } from './pages/nutito-capital/nutito-capital.page';
import { UsersPage } from './pages/users/users.page';
import { CustomersPage } from './pages/customers/customers.page';
import { LicensesPage } from './pages/licenses/licenses.page';
import { ApplicativeAdminPage } from './pages/applicative-admin/applicative-admin.page';
import { AgentRolesPage } from './pages/agents-roles/agent-roles.page';
import { CompanyCategoriesPage } from './pages/company-categories/company-categories.page';
import { WorkfieldsPage } from './pages/workfields/workfields.page';
import { OperationTypesPage } from './pages/operation-types/operation-types.page';
import { CustomerDetailPage } from './pages/customer-detail/customer-detail.page';
import { CompanyDetailsPage } from './pages/company-details/company-details.page';

const routes: Routes = [
  {
    path: "dashboard",
    component: MainPage,
    canActivate: [DashboardGuard],
    children: [
      {
        path: "",
        component: DashboardLandingPage
      },
      {
        path: "capital",
        component: NutitoCapitalPage
      },
      {
        path: "users",
        component: UsersPage
      },
      {
        path: "customers",
        component: CustomersPage
      },
      {
        path: "company-detail",
        component: CompanyDetailsPage
      },
      {
        path: "customer-detail",
        component: CustomerDetailPage,
        children: [
          {
            path: "",
            component: AgentRolesPage
          },
        ]
      },
      {
        path: "licenses",
        component: LicensesPage
      },
      {
        path: "applicative-admin",
        component: ApplicativeAdminPage,
        children: [
          {
            path: "",
            component: AgentRolesPage
          },
          {
            path: "company-categories",
            component: CompanyCategoriesPage
          },
          {
            path: "operation-types",
            component: OperationTypesPage
          },
          {
            path: "workfields",
            component: WorkfieldsPage
          },
        ]
      },
    ]
  },
  {
    path: "login",
    component: LoginPage,
    canActivate: [AuthGuard]
  },
  {
    path: "reset-password",
    component: PasswordResetPage,
    canActivate: [DashboardGuard]
  },
  {
    path: "**",
    redirectTo: "/dashboard"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
