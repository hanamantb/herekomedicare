import { Component, OnInit } from '@angular/core';
import {MastersService} from "../../services/masters.service";

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  constructor(private masterService: MastersService) { }

  ngOnInit(): void {
  }

}
