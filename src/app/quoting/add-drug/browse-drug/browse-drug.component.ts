import {Component, Inject, OnInit} from '@angular/core';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {CommonService} from "../../../services/common.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-browse-drug',
  templateUrl: './browse-drug.component.html',
  styleUrls: ['./browse-drug.component.css']
})
export class BrowseDrugComponent implements OnInit {
  alphabets: string[] = [];
  items:any = [];
  selectedItem:any;
  itemName=''
  constructor(private commonservice:CommonService,private dialog:MatDialog,
              private dialogRef: MatDialogRef<BrowseDrugComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    const startChar = 'A'.charCodeAt(0);
    const endChar = 'Z'.charCodeAt(0);
    for (let i = startChar; i <= endChar; i++) {
      this.alphabets.push(String.fromCharCode(i));
    }
  }

  ngOnInit(): void {

  }

  toggleItemSelection(item: any) {
    this.selectedItem = item
    this.itemName = item.name
    console.log(item.name)
  }

  drugNameAdd() {
this.dialogRef.close(this.selectedItem)
  }

  drugByAlphabet(event:any) {
    console.log('workss',event.target.value)
    this.commonservice.drugByLetter(event.target.value).subscribe((response)=>{
      this.items = response.data.drugs
      console.log('drugs',response)
    })
  }


  cancel() {
    this.dialog.closeAll()
  }
}
