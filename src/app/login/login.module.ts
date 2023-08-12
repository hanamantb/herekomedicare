import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {LoginRoutingModule} from "./login-routing.module";
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {COMMON_SERVICE_TOKEN, CommonService} from "../services/common.service";



@NgModule({
  declarations: [
    LoginComponent

  ],
  providers: [ { provide: COMMON_SERVICE_TOKEN, useClass: CommonService } ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
