import { Component, OnInit } from '@angular/core';
import {takeUntil} from 'rxjs/operators';

import {Subject} from 'rxjs';
import { ErrorDisplayService } from '../services/error-service.service';
import { SpinnerService } from '../services/spinner.service';
import { CommonService } from '../services/common.service';
import { AppConstants } from '../helpers/AppConstants';


@Component({
  selector: 'app-capex-timeline',
  templateUrl: './capex-timeline.component.html',
  styleUrls: ['./capex-timeline.component.css']
})
export class CapexTimelineComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  dataList = [{workStageId: 1 , stage: 'Requester'},
    {workStageId: 2 , stage: 'Functional Head'},
    {workStageId: 4 , stage: 'HO'},
    // {workStageId: 5 , stage: 'CFO'},
  ];
  dataList1 = [{workStageId: 1 , stage: 'Requester'},
    {workStageId: 2 , stage: 'Functional Head'},
    // {workStageId: 3 , stage: 'Department Head'},
    {workStageId: 4 , stage: 'HO'},
    {workStageId: 5 , stage: 'CFO'},
  ];
  dataList2 = [{workStageId: 1 , stage: 'Requester'},
  {workStageId: 2 , stage: 'Functional Head'},
  // {workStageId: 3 , stage: 'Department Head'},
  {workStageId: 4 , stage: 'HO'},
  {workStageId: 5 , stage: 'CFO'},
  {workStageId: 6 , stage: 'MD'},
];
  dataList3 = [{workStageId: 1 , stage: 'Requester'},
    {workStageId: 2 , stage: 'Functional Head'},
        {workStageId: 3 , stage: 'Department Head'},
    {workStageId: 4 , stage: 'HO'},
  ];
  dataList4 = [{workStageId: 1 , stage: 'Requester'},
    {workStageId: 2 , stage: 'Functional Head'},
    {workStageId: 3 , stage: 'Department Head'},
    {workStageId: 4 , stage: 'HO'},
    {workStageId: 5 , stage: 'CFO'},
  ];
  dataList5 = [{workStageId: 1 , stage: 'Requester'},
    {workStageId: 2 , stage: 'Functional Head'},
    {workStageId: 3 , stage: 'Department Head'},
    {workStageId: 4 , stage: 'HO'},
    {workStageId: 5 , stage: 'CFO'},
    {workStageId: 6 , stage: 'MD'},
  ];
  constructor(private errorService: ErrorDisplayService,
    private spinnerService: SpinnerService,
    private commonService: CommonService) {this.approvalId = sessionStorage.getItem(AppConstants.approvalId )}
    curentWorkStageId = 1;
    deptHeadFlg :boolean = false;
    type = 1
    approvalId:any
  list:any[] =[];
  ngOnInit(): void {
    this.getcapexCurrentStage();

  }
  getcapexCurrentStage(): void {
    const approvalId = parseInt(this.approvalId)
    const spinner = this.spinnerService.start();
    this.commonService.getcapexCurrentStage(approvalId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {


          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
           this.curentWorkStageId = response.currentStage;
           this.deptHeadFlg = response.deptHeadFlg;
           this.type = response.Type
           console.log('timeline',response)
            this.flowFounder();
           this.spinnerService.stop(spinner);

          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  flowFounder(){
    console.log('flow',this.type,this.deptHeadFlg)
      if (this.type === 1 &&  this.deptHeadFlg) {
        this.list = this.dataList3
      }
      else if (this.type === 2 &&  this.deptHeadFlg){
        console.log('Worked here')
        this.list = this.dataList4
      }
      else if (this.type === 3 &&  this.deptHeadFlg){
        this.list = this.dataList5
      }
      else if (this.type === 1 &&  !this.deptHeadFlg){
        this.list = this.dataList
      }
      else if (this.type === 2 &&  !this.deptHeadFlg){
        this.list = this.dataList1
      }
      else if (this.type === 3 &&  !this.deptHeadFlg){
        this.list = this.dataList2
      }
  }
}
