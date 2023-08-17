import { Component, OnInit } from '@angular/core';
import {AppConstants} from '../../../helpers/AppConstants';
import {CryptoService} from '../../../helpers/crypto.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-capex-approval-main',
  templateUrl: './capex-approval-main.component.html',
  styleUrls: ['./capex-approval-main.component.css']
})
export class CapexApprovalMainComponent implements OnInit {
  role = '';

  constructor( private cryptoService: CryptoService,
               private cookie: CookieService) {
    this.role = this.cryptoService.decryptData(this.cookie.get(AppConstants.role));

  }

  ngOnInit(): void {

  }


}
