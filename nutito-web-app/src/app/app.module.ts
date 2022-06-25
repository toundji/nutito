import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { LandingComponent } from './components/landing/landing.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardLandingComponent } from './components/dashboard-landing/dashboard-landing.component';
import { DashboardLandingPage } from './pages/dashboard-landing/dashboard-landing.page';
import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthenticationService } from './services/authentication.service';
import { LoadingService } from './services/loading.service';
import { NetworkInterceptor } from './services/network-inerceptor.service';
import { DashboardGuard } from './guards/dashboard.guard';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PasswordResetFormComponent } from './components/password-reset-form/password-reset-form.component';
import { PasswordResetPage } from './pages/reset-password/reset-password.page';
import { MainPage } from './pages/main/main.page';
import { NutitoCapitalComponent } from './components/nutito-capital/nutito-capital.component';
import { NutitoCapitalPage } from './pages/nutito-capital/nutito-capital.page';
import { UsersComponent } from './components/users/users.component';
import { UsersPage } from './pages/users/users.page';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersPage } from './pages/customers/customers.page';
import { LicensesComponent } from './components/licenses/licenses.component';
import { LicensesPage } from './pages/licenses/licenses.page';
import { ApplicativeAdminComponent } from './components/applicative-admin/applicative-admin.component';
import { ApplicativeAdminPage } from './pages/applicative-admin/applicative-admin.page';
import { ApplicativeAdminMenuComponent } from './components/applicative-admin-menu/applicative-admin-menu.component';
import { AgentRolesListComponent } from './components/agent-roles-list/agent-roles-list.component';
import { AgentRolesPage } from './pages/agents-roles/agent-roles.page';
import { AgentRolesFormComponent } from './components/agent-roles-form/agent-roles-form.component';
import { DataTablesModule } from 'angular-datatables';
import { CompanyCategoriesListComponent } from './components/company-categories-list/company-categories-list.component';
import { CompanyCategoryFormComponent } from './components/company-category-form/company-category-form.component';
import { CompanyCategoriesPage } from './pages/company-categories/company-categories.page';
import { WorkfieldsListComponent } from './components/workfields-list/workfields-list.component';
import { WorkfieldsPage } from './pages/workfields/workfields.page';
import { WorkfieldFormComponent } from './components/workfield-form/workfield-form.component';
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LandingComponent,
    SidebarComponent,
    DashboardLandingComponent,
    DashboardLandingPage,
    LoginPage,
    LoginFormComponent,
    PasswordResetFormComponent,
    PasswordResetPage,
    MainPage,
    NutitoCapitalComponent,
    NutitoCapitalPage,
    UsersComponent,
    UsersPage,
    CustomersComponent,
    CustomersPage,
    LicensesComponent,
    LicensesPage,
    ApplicativeAdminComponent,
    ApplicativeAdminPage,
    ApplicativeAdminMenuComponent,
    AgentRolesListComponent,
    AgentRolesPage,
    AgentRolesFormComponent,
    AgentRolesListComponent,
    CompanyCategoriesListComponent,
    CompanyCategoryFormComponent,
    CompanyCategoriesPage,
    WorkfieldsListComponent,
    WorkfieldsPage,
    WorkfieldFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "fr-FR",
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    },
    DashboardGuard,
    AuthGuard,
    NetworkInterceptor,
    AuthenticationService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
