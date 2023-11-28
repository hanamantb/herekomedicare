import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {
  isDropdownOpen: boolean = false;
  showAddCustomerForm: boolean = false;
  
  constructor(private elementRef: ElementRef, public dialog: MatDialog) {
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  openConfirmationPopup() {
    this.dialog.open(DeleteConfirmationComponent, { width: '600px', panelClass: ['alert-popup', 'alert-warning'] })
  }
  addCustomerForm() {
    this.showAddCustomerForm = !this.showAddCustomerForm;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
  ngOnInit(): void {
  }

}
