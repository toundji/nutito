import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLandingComponent } from './components/dashboard-landing/dashboard-landing.component';
import { LandingComponent } from './components/landing/landing.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      {
        path: "",
        component: LandingComponent,
        outlet: "child1"
      },
      {
        path: "dashboard",
        component: DashboardLandingComponent,
        outlet: "child1"
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
