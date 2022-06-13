import { OperationCategoryFormComponent } from './components/company-category-form/company-category.form.component';
import { CompanyCategory } from './pages/company-category/company-category';
import { OperationType } from './pages/operation-type/operation-type';
import { Operation } from './pages/operation/operation';
import { Company } from './pages/company/company';
import { AgentRole } from './pages/agent-role/agent-role.page';
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
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthenticationService } from './services/authentication.service';
import { LoadingService } from './services/loading.service';
import { NetworkInterceptor } from './services/network-inerceptor.service';
import { DashboardGuard } from './guards/dashboard.guard';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PasswordResetFormComponent } from './components/reset-password-form/password-reset-form.component';
import { PasswordResetPage } from './pages/reset-password/reset-password.page';
import { MainPage } from './pages/main/main.page';
import { AgentRoleFormComponent } from './components/agent-role-form/agent-role-form.component';
import { CreateAdministratorFormComponent } from './components/create-administrator-form/create-administrator-form.component';
import { OperationFormComponent } from './components/operation-form/operation-form.component';
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
    DashboardPage,
    LoginPage,
    LoginFormComponent,
    PasswordResetFormComponent,
    PasswordResetPage,
    MainPage,
    AgentRole,
    Company,
    CompanyCategory,
    Operation,
    OperationType,
    AgentRoleFormComponent,
    CreateAdministratorFormComponent,
    OperationCategoryFormComponent,
    OperationCategoryFormComponent,
    LoginFormComponent,
    OperationFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
