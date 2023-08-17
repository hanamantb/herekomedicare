import { Component, OnInit } from '@angular/core';
import {ErrorDisplayService} from '../../../services/error-service.service';
import {SpinnerService} from '../../../services/spinner.service';
import {CommonService} from '../../../services/common.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AppConstants} from '../../../helpers/AppConstants';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  role = '';
  requestId: any;
  datalist: any = [];

  constructor( private errorService: ErrorDisplayService,
               private spinnerService: SpinnerService,
               private commonService: CommonService) {
    this.requestId = sessionStorage.getItem(AppConstants.requestId);
  }

  ngOnInit(): void {
    this.historyOfRequest();
  }

  historyOfRequest(): void {
    const requestId = parseInt(this.requestId)
    const spinner = this.spinnerService.start();
    this.commonService.historyOfRequest(requestId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            console.log(response.data);
            this.datalist = response.data;
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

}
