import { Licence } from './pages/licence/licence.page';
import { Company } from './pages/company/company.page';
import { CompanyCategory } from './pages/company-category/company-category.page';
import { CreateAdministrator } from './pages/create-administrator/create-administrator.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLandingComponent } from './components/dashboard-landing/dashboard-landing.component';
import { LoginPage } from './pages/login/login.page';
import { AuthGuard } from './guards/auth.guard';
import { DashboardGuard } from './guards/dashboard.guard';
import { MainComponent } from './components/main/main.component';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { MainPage } from './pages/main/main.page';
import { PasswordResetPage } from './pages/reset-password/reset-password.page';
import { AgentRole } from './pages/agent-role/agent-role.page';

const routes: Routes = [
  {
    path: "",
    component: MainPage,
    canActivate: [DashboardGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardPage
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
