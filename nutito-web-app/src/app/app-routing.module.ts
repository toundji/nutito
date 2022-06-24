import { Licence } from './pages/licence/licence.page';
import { Company } from './pages/company/company.page';
import { CompanyCategory } from './pages/company-category/company-category.page';
import { CreateAdministrator } from './pages/create-administrator/create-administrator.page';
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
import { AgentRole } from './pages/agent-role/agent-role.page';

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
    path: "dashboard/agent-role",
    component: AgentRole,
    // canActivate: [AuthGuard]
    canActivate: [DashboardGuard]

  },
  {
    path: "dashboard/company",
    component: Company,
    // canActivate: [AuthGuard]
    canActivate: [DashboardGuard]

  },
  {
    path: "dashboard/company-category",
    component: CompanyCategory,
    // canActivate: [AuthGuard]
    canActivate: [DashboardGuard]

  },
  {
    path: "dashboard/create-admininistrator",
    component: CreateAdministrator,
    // canActivate: [AuthGuard]
    canActivate: [DashboardGuard]

  },

  {
    path: "dashboard/licences",
    component: Licence,
    // canActivate: [AuthGuard]
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
