import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actions-cell-renderer',
  templateUrl: './actions-cell-renderer.component.html',
  styleUrls: ['./actions-cell-renderer.component.css']
})
export class ActionsCellRendererComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  editItem() {
    // Handle edit action here
    console.log('Edit button clicked');
  }

  deleteItem() {
    // Handle delete action here
    console.log('Delete button clicked');
  }
}
