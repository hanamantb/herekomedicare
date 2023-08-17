import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { SpinnerService } from '../services/spinner.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { AppConstants } from '../helpers/AppConstants';

@Component({
  selector: 'app-invalid-budgets',
  templateUrl: './invalid-budgets.component.html',
  styleUrls: ['./invalid-budgets.component.css']
})
export class InvalidBudgetsComponent implements OnInit {

  constructor(private spinnerservice:SpinnerService,private commonservice:CommonService,private route: Router) { }

  ngOnInit(): void {
    this.getInvalidBudgets();
  }

  colDef4 =  function() {
    return '<img src="assets/goto.png" height="32" width="34" style=" margin-top: 5px; margin-left: 25px"/>';
  };
  columnDefs = [

    {field: 'index', headerName: '#', width: 50},
    {field: 'budgetIds', headerName: 'budget Id', filter: true, width: 250},
    // {field: 'budgetCd', headerName: 'Capex Code', filter: true, width: 200},
    {field: 'budgetDesc', headerName: 'Capex Description', filter: true, width: 200},
    {field: 'budgetAmount', headerName: 'Capex Amount', filter: true, width: 200},
    {field: 'crtndate', headerName: 'creation date', filter: true, width: 200},
    {field: 'more', headerName: 'View More', filter: true, width: 120, cellRenderer: this.colDef4},

  ];
  rowData = [];
  private ngUnsubscribe = new Subject();


  getInvalidBudgets(): void {
    const spinner = this.spinnerservice.start();
    this.commonservice.getInvalidBudgets()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
console.log(response)
this.rowData = response.data
console.log('rowdata',this.rowData)
this.spinnerservice.stop(spinner);
        },
        error =>{
console.log('error in capexinvalidbudgets')
this.spinnerservice.stop(spinner);

        }
      )
  }
  onGridCellClicked(event: any): void {
    const approvalId = event.data.approvalId;
    console.log('appid',approvalId)
    console.log('click',event.data)
    if (event.colDef.field === 'more') {
      sessionStorage.setItem(AppConstants.approvalId, approvalId);
      this.route.navigate(['/approval-details']);
    }

  }
}
