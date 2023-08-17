import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ErrorDialogComponent} from './general/error-dialog/error-dialog.component';
import {SuccessSnackbarComponent} from './general/success-snackbar/success-snackbar.component';
import {MatButtonModule} from '@angular/material/button';
import {DashboardComponent} from './ui/dashboard/dashboard.component';
import {SidebarComponent} from './general/sidebar/sidebar.component';
import {ToolbarComponent} from './general/toolbar/toolbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {AgGridModule} from 'ag-grid-angular';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AuthInterceptor} from './helpers/auth.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {SubmitRequestComponent} from './ui/submit-request/submit-request.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {FileUploadComponent} from './general/file-upload/file-upload.component';
import {RequestDetailsComponent} from './ui/request-details/request-details.component';
import {HistoryComponent} from './ui/request-details/history/history.component';
import {RequesterDashboardComponent} from './ui/dashboard/requester-dashboard/requester-dashboard.component';
import {VpHeadDashboardComponent} from './ui/dashboard/vp-head-dashboard/vp-head-dashboard.component';
import {CfoDashboardComponent} from './ui/dashboard/cfo-dashboard/cfo-dashboard.component';
import {EditRequestComponent} from './ui/submit-request/edit-request/edit-request.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AllBudgetsComponent} from './ui/all-budgets/all-budgets.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ResubmitRequestsComponent} from './ui/resubmit-requests/resubmit-requests.component';
import {SubmittedRequestsComponent} from './ui/submitted-requests/submitted-requests.component';
import {RejectedRequestsComponent} from './ui/rejected-requests/rejected-requests.component';
import {ApprovedRequestsComponent} from './ui/approved-requests/approved-requests.component';
import {LoadingSpinnerComponent} from './general/loading-spinner/loading-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {UploadErrorDetailsComponent} from './ui/upload-error-details/upload-error-details.component';
import {RequestUploadScreenComponent} from './ui/request-upload-screen/request-upload-screen.component';
import {TimelineComponent} from './ui/request-details/timeline/timeline.component';
import {AdminDashboardComponent} from './ui/dashboard/admin-dashboard/admin-dashboard.component';
import {SuperadminDashboardComponent} from './ui/dashboard/superadmin-dashboard/superadmin-dashboard.component';
import {UpdateQuantitiesComponent} from './ui/request-details/update-quantities/update-quantities.component';
import {DeptHeadDashboardComponent} from './ui/dashboard/dept-head-dashboard/dept-head-dashboard.component';
import {RequestForCapexApprovalComponent} from './ui/CAPEX APPROVAL/request-for-capex-approval/request-for-capex-approval.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {CapexApprovalMainComponent} from './ui/CAPEX APPROVAL/capex-approval-main/capex-approval-main.component';
import {CapexApprovalForFunctionalHeadComponent} from './ui/CAPEX APPROVAL/capex-approval-for-functional-head/capex-approval-for-functional-head.component';
import {CapexBudgetApprovalMoreDetailsComponent} from './ui/CAPEX APPROVAL/capex-budget-approval-more-details/capex-budget-approval-more-details.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {CapexBudgetSubmitFormComponent} from './ui/CAPEX APPROVAL/capex-budget-submit-form/capex-budget-submit-form.component';
import {MatTableModule} from '@angular/material/table';
import {CapexBudgetSubmitComponent} from './capex-budget-submit/capex-budget-submit.component';
import {CapexBudgetPendingComponent} from './capex-budget-pending/capex-budget-pending.component';
import {CapexBudgetApprovedComponent} from './capex-budget-approved/capex-budget-approved.component';
import {BudgetHistoryComponent} from './budget-history/budget-history.component';
import {InvalidBudgetsComponent} from './invalid-budgets/invalid-budgets.component';
import {CapexTimelineComponent} from './capex-timeline/capex-timeline.component';
import {SuperadminpushComponent} from './superadminpush/superadminpush.component';
import {UserPlantMpngComponent} from './user-plant-mpng/user-plant-mpng.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CfoPushpageComponent} from './cfo-pushpage/cfo-pushpage.component';
import { RepositoryComponent } from './ui/repository/repository.component';
import { IoDashboardComponent } from './ui/internal-order/io-dashboard/io-dashboard.component';
import { CreateIoComponent } from './ui/internal-order/create-io/create-io.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from "@angular/material/tooltip";
import { ReportComponent } from './ui/internal-order/report/report.component';
@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    SuccessSnackbarComponent,
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent,
    SubmitRequestComponent,
    FileUploadComponent,
    RequestDetailsComponent,
    HistoryComponent,
    RequesterDashboardComponent,
    VpHeadDashboardComponent,
    CfoDashboardComponent,
    EditRequestComponent,
    AllBudgetsComponent,
    ResubmitRequestsComponent,
    SubmittedRequestsComponent,
    RejectedRequestsComponent,
    ApprovedRequestsComponent,
    LoadingSpinnerComponent,
    UploadErrorDetailsComponent,
    RequestUploadScreenComponent,
    TimelineComponent,
    AdminDashboardComponent,
    SuperadminDashboardComponent,
    UpdateQuantitiesComponent,
    DeptHeadDashboardComponent,
    RequestForCapexApprovalComponent,
    CapexApprovalMainComponent,
    CapexApprovalForFunctionalHeadComponent,
    CapexBudgetApprovalMoreDetailsComponent,
    CapexBudgetSubmitFormComponent,
    CapexBudgetSubmitComponent,
    CapexBudgetPendingComponent,
    CapexBudgetApprovedComponent,
    BudgetHistoryComponent,
    InvalidBudgetsComponent,
    CapexTimelineComponent,
    SuperadminpushComponent,
    UserPlantMpngComponent,
    CfoPushpageComponent,
    RepositoryComponent,
    IoDashboardComponent,
    CreateIoComponent,
    ReportComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatRadioModule,
    MatExpansionModule,
    AngularFileUploaderModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatTooltipModule,
    AgGridModule.withComponents([
      DashboardComponent
    ]),
    MatTableModule

  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
