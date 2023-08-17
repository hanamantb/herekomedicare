import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './ui/dashboard/dashboard.component';
import {SubmitRequestComponent} from './ui/submit-request/submit-request.component';
import {RequestDetailsComponent} from './ui/request-details/request-details.component';
import {AllBudgetsComponent} from './ui/all-budgets/all-budgets.component';
import {ResubmitRequestsComponent} from './ui/resubmit-requests/resubmit-requests.component';
import {SubmittedRequestsComponent} from './ui/submitted-requests/submitted-requests.component';
import {ApprovedRequestsComponent} from './ui/approved-requests/approved-requests.component';
import {RejectedRequestsComponent} from './ui/rejected-requests/rejected-requests.component';
import {RequestUploadScreenComponent} from './ui/request-upload-screen/request-upload-screen.component';
import {RequestForCapexApprovalComponent} from './ui/CAPEX APPROVAL/request-for-capex-approval/request-for-capex-approval.component';
import {CapexApprovalMainComponent} from './ui/CAPEX APPROVAL/capex-approval-main/capex-approval-main.component';
import {CapexBudgetApprovalMoreDetailsComponent} from './ui/CAPEX APPROVAL/capex-budget-approval-more-details/capex-budget-approval-more-details.component';
import {CapexBudgetSubmitFormComponent} from './ui/CAPEX APPROVAL/capex-budget-submit-form/capex-budget-submit-form.component';
import {CapexBudgetSubmitComponent} from './capex-budget-submit/capex-budget-submit.component';
import {CapexBudgetPendingComponent} from './capex-budget-pending/capex-budget-pending.component';
import {CapexBudgetApprovedComponent} from './capex-budget-approved/capex-budget-approved.component';
import {BudgetHistoryComponent} from './budget-history/budget-history.component';
import {InvalidBudgetsComponent} from './invalid-budgets/invalid-budgets.component';
import {SuperadminpushComponent} from './superadminpush/superadminpush.component';
import {UserPlantMpngComponent} from './user-plant-mpng/user-plant-mpng.component';
import {CfoPushpageComponent} from './cfo-pushpage/cfo-pushpage.component';
import {RepositoryComponent} from "./ui/repository/repository.component";
import {IoDashboardComponent} from "./ui/internal-order/io-dashboard/io-dashboard.component";
import {CreateIoComponent} from "./ui/internal-order/create-io/create-io.component";
import {RequesterDashboardComponent} from "./ui/dashboard/requester-dashboard/requester-dashboard.component";
import {VpHeadDashboardComponent} from "./ui/dashboard/vp-head-dashboard/vp-head-dashboard.component";
import {CfoDashboardComponent} from "./ui/dashboard/cfo-dashboard/cfo-dashboard.component";
import {AdminDashboardComponent} from "./ui/dashboard/admin-dashboard/admin-dashboard.component";
import {SuperadminDashboardComponent} from "./ui/dashboard/superadmin-dashboard/superadmin-dashboard.component";
import {ReportComponent} from "./ui/internal-order/report/report.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'request', component: SubmitRequestComponent},
  {path: 'request-upload', component: RequestUploadScreenComponent},
  {path: 'request-details', component: RequestDetailsComponent},
  {path: 'all-budgets', component: AllBudgetsComponent},
  {path: 'resubmit-request', component: ResubmitRequestsComponent},
  {path: 'submitted-request', component: SubmittedRequestsComponent},
  {path: 'approved-request', component: ApprovedRequestsComponent},
  {path: 'rejected-request', component: RejectedRequestsComponent},
  {path: 'capex-approval', component: CapexApprovalMainComponent},
  {path: 'approval-details', component: CapexBudgetApprovalMoreDetailsComponent},
  {path: 'new-budget', component: CapexBudgetSubmitFormComponent},
  {path: 'capex-budget-approved', component: CapexBudgetApprovedComponent},
  {path: 'capex-budget-pending', component: CapexBudgetPendingComponent},
  {path: 'capex-budget-submit', component: CapexBudgetSubmitComponent},
  {path: 'budget-history', component: BudgetHistoryComponent},
  {path: 'InvalidBudgetsComponent', component: InvalidBudgetsComponent},
  {path: 'superadmin-push', component: SuperadminpushComponent},
  {path: 'user-mping', component: UserPlantMpngComponent},
  {path: 'cfo-push', component: CfoPushpageComponent},
  {path: 'repository', component: RepositoryComponent},
  {path: 'io-dashboard', component: IoDashboardComponent},
  {path: 'create-io', component: CreateIoComponent},
  {path: 'req-dash', component: RequesterDashboardComponent},
  {path: 'vp-dash', component: VpHeadDashboardComponent},
  {path: 'cfo-dash', component: CfoDashboardComponent},
  {path: 'admin-dash', component: AdminDashboardComponent},
  {path: 'super-dash', component: SuperadminDashboardComponent},
  {path: 'io-report', component: ReportComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
