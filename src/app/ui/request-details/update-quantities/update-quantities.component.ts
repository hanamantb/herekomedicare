import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {ErrorDisplayService} from '../../../services/error-service.service';
import {CryptoService} from '../../../helpers/crypto.service';
import {SpinnerService} from '../../../services/spinner.service';
import {CookieService} from 'ngx-cookie-service';
import {CommonService} from '../../../services/common.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-update-quantities',
  templateUrl: './update-quantities.component.html',
  styleUrls: ['./update-quantities.component.css']
})
export class UpdateQuantitiesComponent implements OnInit {
  appoxVal = 0;
  qty  = 0;
  requestId = 0;
  private ngUnsubscribe = new Subject();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private cookie: CookieService,
              private dialog: MatDialog,
              private route: Router,
              private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService,
              private cryptoService: CryptoService) { }

  ngOnInit(): void {
    console.log("dataaa--",this.data);
    this.qty = this.data.qty;
    // let conv = JSON.parse(this.data.appoxVal)
    let conv = JSON.stringify(this.data.appoxVal)
    this.appoxVal =this.data.appoxVal;
    this.requestId = this.data.requestId;
  }

  updateQty(): void {
    const spinner = this.spinnerService.start();
    this.commonService.updateQtys(this.requestId, this.qty, this.appoxVal)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            this.errorService.showSuccess(response.retMsg);

          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );

  }

}
