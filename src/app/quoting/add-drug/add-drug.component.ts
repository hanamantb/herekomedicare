import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GridApi} from "ag-grid-community";
import {BrowseDrugComponent} from "./browse-drug/browse-drug.component";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-add-drug',
  templateUrl: './add-drug.component.html',
  styleUrls: ['./add-drug.component.css']
})
export class AddDrugComponent implements OnInit {
  rowData: any = [];
  alphabets: string[] = [];
  items = [];
  drugForm!: FormGroup;
  gridapi?: GridApi;
  drugname = new FormControl()
  selectedItem: any;
  itemName = ''
  drugs:any =[];
  dosagesDetails:any=[];
  dosages:any=[];
  packages:any=[];

  constructor(private route: Router, public dialog: MatDialog,
              private offcanvasService: NgbOffcanvas,
              public fb: FormBuilder,
              private commonservice: CommonService) {
    const startChar = 'A'.charCodeAt(0);
    const endChar = 'Z'.charCodeAt(0);

    for (let i = startChar; i <= endChar; i++) {
      this.alphabets.push(String.fromCharCode(i));
    }
    this.drugForm = this.fb.group({
      drugName: [null, [Validators.required]],
      dosage: [null, [Validators.required]],
      package: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      frequency: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  colDef5 = function () {
    return '<img src="assets/edit.png" height="32" />';
  };

  columnDefs = [
    {
      field: 'index', headerName: '#', width: 80,

    },
    {field: 'drugName', headerName: 'Drug Name', filter: true, width: 150, flex: 1},
    {field: 'dosage', headerName: 'Dosage', filter: true, width: 100},
    {field: 'package', headerName: 'Package', filter: true, width: 200},
    {field: 'quantity', headerName: 'Quantity', filter: true, width: 100},
    {field: 'frequency', headerName: 'Frequency', filter: true, width: 150},
    {
      headerName: 'Actions',
      cellRenderer: this.colDef5, width: 100
    },
  ];

  addPharmacy() {
    this.dialog.closeAll()
    this.route.navigate(['add-pharmacy'])
  }

  open() {
   const dataDialog = this.dialog.open(BrowseDrugComponent, {width: '350px',
     position: { right: '0'}});
    dataDialog.afterClosed().subscribe(ret=>{
      console.log('retData',ret)
      this.itemName = ret.name
      this.getDosageDetails(ret.rxcui)
    })
  }

  toggleItemSelection(item: any) {
    this.selectedItem = item
    this.itemName = item.name
    console.log(item.name)
  }

  navPlans() {
    this.route.navigate(['Plans'])
    this.dialog.closeAll()
  }

  addDrug() {
    console.log('drgggg', this.drugForm.value)
    this.drugForm.patchValue({
      drugName:this.itemName
    })
    this.rowData.push(this.drugForm.value)
    this.gridapi?.setRowData(this.rowData)
  }

  onGridReady(params: any): void {
    this.gridapi = params.api;
  }


  getDrugs(event: any) {
    console.log(event)
    this.commonservice.searchDrug(event.target.value).subscribe((response) => {
      this.drugs= response.data.drugs
      console.log(response)
    })
  }

  _displayplantname(drug: any) {
    if (drug) {
      return drug.name
    }
    return '';
  }

  change(event: any) {
    console.log(event.option.value)
    this.itemName = event.option.value.name
    this.getDosageDetails( event.option.value.rxcui)
  }
  getDosageDetails(rxcui:any){
    this.commonservice.drugDosage(rxcui).subscribe((response)=>{
      console.log('getDosageDetails',response)
      this.dosagesDetails = response.data
      const distinctValues = Array.from(new Set(this.dosagesDetails.map((item:any) => item.dosage_form)));
      this.dosages = distinctValues;
      console.log('distinctValues',distinctValues)
    })

  }

  dosageChange(event:any) {

    const filteredData = this.dosagesDetails.filter((item:any) => item.dosage_form === event.value);
    console.log('filteredData---',filteredData)
    this.packages = Array.from(new Set(filteredData.map((item:any) => item.package_description)));
  }
}
