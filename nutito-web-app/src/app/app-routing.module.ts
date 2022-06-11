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
    path: "**",
    redirectTo: "/dashboard"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
