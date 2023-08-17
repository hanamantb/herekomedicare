import { Component, OnInit } from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ErrorDisplayService} from '../../../services/error-service.service';
import {SpinnerService} from '../../../services/spinner.service';
import {CommonService} from '../../../services/common.service';
import {AppConstants} from '../../../helpers/AppConstants';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  dataList = [
    {workStageId: 1 , stage: 'Requester'},
    {workStageId: 2 , stage: 'Functional Head'},
    {workStageId: 4 , stage: 'HO'},
    {workStageId: 5 , stage: 'CFO'},
  ];
  dataList1 = [{workStageId: 1 , stage: 'Requester'},
    {workStageId: 2 , stage: 'Functional Head'},
    {workStageId: 3 , stage: 'Department Head'},
    {workStageId: 4 , stage: 'HO'},
    {workStageId: 5 , stage: 'CFO'},
  ];

  curentWorkStageId = 1;
  deptHeadFlg = false;
  requestId: any;

  constructor(private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService) {
    this.requestId = sessionStorage.getItem(AppConstants.requestId);
  }

  ngOnInit(): void {
    this.getCurrentStage();
  }
  getCurrentStage(): void {
    const requestId = parseInt(this.requestId)
    const spinner = this.spinnerService.start();
    this.commonService.getCurrentStage(requestId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
           this.curentWorkStageId = response.currentStage;
           this.deptHeadFlg = response.deptHeadFlg;
           console.log('timeline',response)
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

}
