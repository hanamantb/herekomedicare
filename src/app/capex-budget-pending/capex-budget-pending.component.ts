import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonService } from '../services/common.service';
import { SpinnerService } from '../services/spinner.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { AppConstants } from '../helpers/AppConstants';
import { Router } from '@angular/router';
import {RowNode,GridApi} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';
import {MastersService} from "../services/masters.service";


@Component({
  selector: 'app-capex-budget-pending',
  templateUrl: './capex-budget-pending.component.html',
  styleUrls: ['./capex-budget-pending.component.css']
})
export class CapexBudgetPendingComponent implements OnInit {
  @ViewChild('agGrid', {static: true}) ahGrid!: AgGridAngular;
  private ngUnsubscribe = new Subject();
  constructor( private spinnerservice:SpinnerService,
               private commonservice:CommonService,
               private route: Router,
               private masterService:MastersService) { }

  selectedRequests: any = [];
  gridapi?: GridApi;
  fyi=''

  ngOnInit(): void {
    this.getAllCapexRequests();
  }
  colDef4 = function () {
    return '<img src="assets/goto.png" height="24" width="22" style=" margin-top: 5px; margin-left: 25px;text-align: center"/>';
  };
  colDef5 = function () {
    return '<img src="assets/edit.png" height="24" width="22" style=" margin-top: 5px; margin-left: 5px"/>';
  };

  columnDefs = [
    {
      field: 'index', checkboxSelection: true, headerName: '#', width: 80, headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'more', headerName: 'View More', filter: true, width: 120, cellRenderer: this.colDef4},
    {field: 'requester', headerName: 'Requester', filter: true, width: 110},
    {field: 'budgetIds', headerName: 'Budget Ids', filter: true, width: 200},
    // {field: 'budgetCd', headerName: 'Capex Code', filter: true, width: 200},
    {field: 'plant', headerName: 'Plant', filter: true, width: 200},
    {field: 'budgetDesc', headerName: 'Capex Description', filter: true, width: 200},
    {field: 'budgetAmount', headerName: 'Capex Amount', filter: true, width: 200},
     {field: 'pending', headerName: 'pending With', filter: true, width: 200},
    {field: 'crtndate', headerName: 'Creation Date', filter: true, width: 200},


  ];
  rowData = [];
  getAllCapexRequests(): void {
    const spinner = this.spinnerservice.start();
    this.masterService.events$.subscribe(event => {
      console.log('eeeeeeeeevvvvvvvvvvv', event)
      this.fyi = event
    });
    this.commonservice.getAllCapexRequests(this.fyi)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
console.log(response)
this.rowData = response.data
this.spinnerservice.stop(spinner);
        },
        error =>{
console.log('error in getallcapexbudgets')
this.spinnerservice.stop(spinner);

        }
      )
  }

  onGridCellClicked(event: any): void {
    const approvalId = event.data.approvalId;
    if (event.colDef.field === 'more') {
      sessionStorage.setItem(AppConstants.approvalId, approvalId);
      this.route.navigate(['/approval-details']);
    }
  }
  activitySelected(event: any): void {
    console.log(event.data);
    this.gridapi?.forEachNodeAfterFilter((rowNode: RowNode, index: number) => {
    });
    if (event.node.selected === true) {
      this.selectedRequests.push(event.data.approvalId);
    } else if (event.node.selected === false) {
      const updateSelect = [];
      for (const el of this.selectedRequests) {
        if (el !== event.data.approvalId) {
          updateSelect.push(el);
        }
      }
      this.selectedRequests = updateSelect;
    }
    console.log(this.selectedRequests);
  }


  dwnldfilteredrequest(): void {
    if (this.selectedRequests != null){
      this.commonservice.downloadCapexData(this.selectedRequests).subscribe((resp => {
        const url = window.URL.createObjectURL(resp);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = 'Budget_Approval_Template.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
        // this.toastr.success('Successfully Downloaded', '');
      }));
    }}



}
