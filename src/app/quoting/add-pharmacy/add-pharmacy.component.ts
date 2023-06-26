import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AgGridAngular} from "ag-grid-angular";
import {GridApi} from "ag-grid-community";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-add-pharmacy',
  templateUrl: './add-pharmacy.component.html',
  styleUrls: ['./add-pharmacy.component.css']
})
export class AddPharmacyComponent implements OnInit {
  rowData: any = [];
  pharmacies:any = []
  @ViewChild('agGrid', {static: true}) ahGrid!: AgGridAngular;
  gridapi?: GridApi;
  zipcode:any='32007';
  radius_miles:any='10';

  constructor(private route: Router,private commonservice: CommonService) {
  }

  ngOnInit(): void {
  }

  colDef5 = function () {
    return '<img src="assets/delete.png" height="30" />';
  };
  columnDefs = [
    {
      field: 'index', headerName: '#', width: 80,

    },
    {field: 'name', headerName: 'Pharmacy Name', filter: true, width: 200},
    {field: 'street', headerName: 'Address', filter: true, width: 250,flex:1},
    {
      field: 'delete',
      headerName: 'Action',
      cellRenderer: this.colDef5,
    },
  ];

  nav() {
    this.route.navigate(['Plans'])
  }

  check(event:any,data: any) {
    console.log("laassssss", event.target.checked)
    const index = this.rowData.findIndex((item:any) => item.name === data.name);
    if (index > -1) {
      // Item exists in the array, remove it
      this.rowData.splice(index, 1);
    } else {
      // Item doesn't exist in the array, add it
      this.rowData.push(data);
    }
    this.gridapi?.setRowData(this.rowData)
  }

  onGridReady(params: any): void {
    this.gridapi = params.api;
  }

  onGridCellClicked(event: any): void {
    console.log(event.data)
    if (event.colDef.field === 'delete') {
      this.rowData.forEach((element: any, index: any) => {
        console.log(element)
        if (event.data.id == element.id) {
          console.log('delete')
          this.rowData.splice(index,1)
          console.log('after--delete',this.rowData)
          this.gridapi?.setRowData(this.rowData)
        }
        })

      }
    }

  findPharmacy() {
    this.commonservice.searchPharmacy(this.zipcode,this.radius_miles).subscribe((response)=>{
      this.pharmacies = response.data.listOfPharmacy
      console.log('pharmacy',response)
    })
    console.log(this.zipcode,this.radius_miles)
  }
}
