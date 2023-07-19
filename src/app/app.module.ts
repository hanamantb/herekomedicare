import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./shared/shared.module";
import { MedicareQuotingComponent } from './medicare-quoting/medicare-quoting.component';
import { QuotingComponent } from './quoting/quoting.component';
import { ZipcodeQoutingComponent} from './quoting/zipcode-qouting/zipcode-qouting.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from "@angular/material/button";
import { CustomerQoutingComponent } from './quoting/customer-qouting/customer-qouting.component';
import { PrescriptionDrugsComponent } from './quoting/prescription-drugs/prescription-drugs.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import { AddDrugComponent } from './quoting/add-drug/add-drug.component';
import {AgGridModule} from "ag-grid-angular";
import { AddPharmacyComponent } from './quoting/add-pharmacy/add-pharmacy.component';
import { DoctorsComponent } from './quoting/doctors/doctors.component';
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { BrowseDrugComponent } from './quoting/add-drug/browse-drug/browse-drug.component';
import {MatTabsModule} from "@angular/material/tabs";
import {HttpClientModule} from "@angular/common/http";
import { DrugCostComponent } from './quoting/drug-cost/drug-cost.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { CartComponent } from './quoting/cart/cart.component';
import { CartHomeComponent } from './quoting/cart/cart-home/cart-home.component';
import { EmailProposalComponent } from './quoting/cart/email-proposal/email-proposal.component';
import {SharedService} from "./services/shared.service";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { ActionsCellRendererComponent } from './quoting/add-drug/actions-cell-renderer/actions-cell-renderer.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ErrorPopupComponent} from "./shared/layouts/error-popup/error-popup.component";



@NgModule({
  declarations: [
    AppComponent,
    MedicareQuotingComponent,
    QuotingComponent,
    ZipcodeQoutingComponent,
    CustomerQoutingComponent,
    PrescriptionDrugsComponent,
    AddDrugComponent,
    AddPharmacyComponent,
    DoctorsComponent,
    BrowseDrugComponent,
    DrugCostComponent,
    CartComponent,
    CartHomeComponent,
    EmailProposalComponent,
    ActionsCellRendererComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    AgGridModule,
    MatSlideToggleModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatTabsModule,
    MatExpansionModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  exports:[MatTabsModule],
  providers: [HttpClientModule,SharedService],
  bootstrap: [AppComponent],
  entryComponents:[
    AddDrugComponent,
    ErrorPopupComponent
  ]
})
export class AppModule { }
