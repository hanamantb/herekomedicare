import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-drug',
  templateUrl: './add-drug.component.html',
  styleUrls: ['./add-drug.component.css']
})
export class AddDrugComponent implements OnInit {
  rowData = [{
    drugName:'abcd',
    dosage:'20mg/ml',
    package:'240 ml Solution',
    quantity:'2',
    frequency:'Every Month',
    actions:'none',
  }];
  alphabets: string[] = [];
  items = [
    { name: 'ABC -1', selected: false },
    { name: 'ABC 2', selected: false },
    { name: 'ABC 3', selected: false },
    { name: 'ABC 4', selected: false },
    { name: 'ABC 5', selected: false },
    { name: 'ABC 6', selected: false },

  ];

  constructor(private route:Router,public dialog: MatDialog,private offcanvasService: NgbOffcanvas) {
    const startChar = 'A'.charCodeAt(0);
    const endChar = 'Z'.charCodeAt(0);

    for (let i = startChar; i <= endChar; i++) {
      this.alphabets.push(String.fromCharCode(i));
    }
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
    {field: 'drugName', headerName: 'Drug Name', filter: true, width: 200},
    {field: 'dosage', headerName: 'Dosage', filter: true, width: 100},
    {field: 'package', headerName: 'Package', filter: true, width: 200},
    {field: 'quantity', headerName: 'Quantity', filter: true, width: 100},
    {field: 'frequency', headerName: 'Frequency', filter: true, width: 150},
    {
      headerName: 'Actions',
      cellRenderer: this.colDef5,
    },
  ];

  addPharmacy(){
    this.dialog.closeAll()
    this.route.navigate(['add-pharmacy'])
  }
  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
  toggleItemSelection(item: any) {
    item.selected = !item.selected;
  }

}
