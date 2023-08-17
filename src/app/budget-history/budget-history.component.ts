import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppConstants } from '../helpers/AppConstants';
import { CommonService } from '../services/common.service';
import { ErrorDisplayService } from '../services/error-service.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-budget-history',
  templateUrl: './budget-history.component.html',
  styleUrls: ['./budget-history.component.css']
})
export class BudgetHistoryComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  role = '';
  approvalId: any;
  datalist: any = [];
  constructor( private commonService:CommonService, private spinnerService:SpinnerService, private errorService:ErrorDisplayService) {
    this.approvalId = sessionStorage.getItem(AppConstants.approvalId)
   }

  ngOnInit(): void {
    this.historyOfBudget();
  }

  historyOfBudget(): void {
    const approvalId = parseInt(this.approvalId)
    const spinner = this.spinnerService.start();
    this.commonService.historyOfBudget(approvalId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          console.log('returnmsg',response)
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
