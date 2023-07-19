import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AgGridAngular} from "ag-grid-angular";
import {GridApi} from "ag-grid-community";
import {CommonService} from "../../services/common.service";
import {QuoteDataDetailsService} from "../../services/quote-data-details.service";
import {SpinnerService} from "../../services/spinner.service";

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
  zipcode:any;
  radius_miles:any='10';
  pharmName:any='';
  page:any='0';


  constructor(private route: Router,
              private commonservice: CommonService,
              private quoteDetailsService:QuoteDataDetailsService,
              private spinner:SpinnerService) {
  }

  ngOnInit(): void {
    this.zipcode = localStorage.getItem('zipcode')
    this.findPharmacy(this.page)
  }

  colDef5 = function () {
    return '<img src="assets/delete.png" height="30" style="margin-top: -10px;" />';
  };
  columnDefs = [
    {
      field: 'index', headerName: '#', width: 80,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'name', headerName: 'Pharmacy Name', filter: true, width: 200},
    {field: 'street', headerName: 'Address', filter: true, width: 250,flex:1},
    {field: 'distance_miles', headerName: 'Distance', filter: true, width: 250,flex:1},
    {
      field: 'delete',
      headerName: 'Action',
      cellRenderer: this.colDef5,
    },
  ];

  nav() {
    const npis = this.rowData.map((x:any)=> x.npi)
    this.quoteDetailsService.setnpis(npis)
    localStorage.setItem('pharmacies',JSON.stringify(npis))
    console.log('npis',npis)
    this.route.navigate(['Plans'])
  }

  check(event:any,data: any) {
    console.log("laassssss", event)
    if (data.checked == true){
      this.rowData.push(data);
    }else {
      const index = this.rowData.findIndex((item:any) => item.name === data.name);
      if (index > -1) {
        // Item exists in the array, remove it
        this.rowData.splice(index, 1);
      }
    }
    // const index = this.rowData.findIndex((item:any) => item.name === data.name);
    // if (index > -1) {
    //   // Item exists in the array, remove it
    //   this.rowData.splice(index, 1);
    // } else {
    //   // Item doesn't exist in the array, add it
    //   this.rowData.push(data);
    // }
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
          event.data.checked = false
          this.rowData.splice(index,1)
          console.log('after--delete',this.rowData)
          this.gridapi?.setRowData(this.rowData)
        }
        })

      }
    }

  findPharmacy(page:any) {
    const spine=this.spinner.start()
    this.commonservice.searchPharmacy(this.zipcode,this.radius_miles,this.pharmName,page).subscribe((response)=>{
      if (response.status === true){
        this.pharmacies = response.data.listOfPharmacy
        this.pharmacies = this.pharmacies.map((element:any, index:any) => {
          return { ...element,
            checked: false,
        }})
        this.page = response.data.total_results
    }
this.spinner.stop(spine)
      console.log('pharmacy',response)
    })
    console.log(this.zipcode,this.radius_miles)
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex +1;
    const endIndex = startIndex + event.pageSize;
    this.findPharmacy(startIndex)
    console.log('startIndex',event.pageIndex)
    console.log('endIndex',endIndex)
  }

  mailOrder($event: any) {
    const index = this.rowData.findIndex((item:any) => item.name === 'Mail Order Pharmacy');
    if (index > -1) {
      // Item exists in the array, remove it
      this.rowData.splice(index, 1);
    } else {
const data ={
  name:'Mail Order Pharmacy',
  street:'',
  distance_miles:''
}
      this.rowData.push(data);
    }
    this.gridapi?.setRowData(this.rowData)
  }

  distanceChange() {
    this.findPharmacy('0')
  }
}
