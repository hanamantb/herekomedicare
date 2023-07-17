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
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  edit(): void {
    if (this.params && this.params.onClick instanceof Function) {
      console.log(this.params.data)
      const { row, column } = this.params;
      this.params.onClick('edit',this.params.data);
    }
  }

  delete(): void {
    if (this.params && this.params.onClick instanceof Function) {
      const { row, column } = this.params;
      this.params.onClick('delete',this.params.data);
    }
  }
  refresh(): boolean {
    return false;
  }
}
