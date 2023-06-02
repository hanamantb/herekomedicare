import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./shared/shared.module";
import { MedicareQuotingComponent } from './medicare-quoting/medicare-quoting.component';
import { QuotingComponent } from './quoting/quoting.component';
import { ZipcodeQoutingComponent } from './quoting/zipcode-qouting/zipcode-qouting.component';
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

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    AddDrugComponent
  ]
})
export class AppModule { }
