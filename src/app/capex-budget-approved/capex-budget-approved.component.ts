import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonService} from '../services/common.service';
import {SpinnerService} from '../services/spinner.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AppConstants} from '../helpers/AppConstants';
import {RowNode,GridApi} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';
import {MastersService} from "../services/masters.service";

@Component({
  selector: 'app-capex-budget-approved',
  templateUrl: './capex-budget-approved.component.html',
  styleUrls: ['./capex-budget-approved.component.css']
})
export class CapexBudgetApprovedComponent implements OnInit {
  @ViewChild('agGrid', {static: true}) ahGrid!: AgGridAngular;

  selectedRequests: any = [];
  gridapi?: GridApi;
  fyi=''
  constructor(private spinnerservice: SpinnerService,
              private commonservice: CommonService,
              private route: Router
    ,private masterService:MastersService) {
  }

  ngOnInit(): void {
    this.capexApprovedBudgets();
  }

  colDef4 = function () {
    return '<img src="assets/goto.png" height="32" width="34" style=" margin-top: 5px; margin-left: 25px"/>';
  };
  columnDefs = [

    {
      field: 'index', checkboxSelection: true, headerName: '#', width: 80, headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'budgetIds', headerName: 'Budget Id', filter: true, width: 250},
    {field: 'more', headerName: 'View More', filter: true, width: 120, cellRenderer: this.colDef4},
    {field: 'requester', headerName: 'Requester', filter: true, width: 110},
    {field: 'plant', headerName: 'Plant', filter: true, width: 210},
    {field: 'budgetCd', headerName: 'Capex Code', filter: true, width: 250},
    {field: 'budgetDesc', headerName: 'Capex Description', filter: true, width: 200},
    {field: 'budgetAmount', headerName: 'Capex Amount', filter: true, width: 200},
    {field: 'pendingWith', headerName: 'Pending With', filter: true, width: 150},
    {field: 'crtndate', headerName: 'Creation Date', filter: true, width: 150},

  ];
  rowData = [];
  private ngUnsubscribe = new Subject();


  capexApprovedBudgets(): void {
    const spinner = this.spinnerservice.start();
    this.masterService.events$.subscribe(event => {
      console.log('eeeeeeeeevvvvvvvvvvv', event)
      this.fyi = event
    });
    this.commonservice.capexApprovedBudgets(this.fyi)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          console.log(response)
          this.rowData = response.data
          console.log('rowdata', this.rowData)
          this.spinnerservice.stop(spinner);
        },
        error => {
          console.log('error in capexApprovedBudgets')
          this.spinnerservice.stop(spinner);

        }
      )
  }

  onGridCellClicked(event: any): void {
    const approvalId = event.data.approvalId;
    console.log('appid', approvalId)
    console.log('click', event.data)
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

      // this.selectedRequests.pop(event.data.tempId);
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

  onGridReady(params: any): void {
    this.gridapi = params.api;
  }

  exportExcel(){
    this.gridapi?.exportDataAsExcel();
  }
}
