import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from "@angular/router";
import { Injectable, Inject } from '@angular/core';
import {COMMON_SERVICE_TOKEN, CommonService} from "../services/common.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  emailControl: any;
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    @Inject(COMMON_SERVICE_TOKEN)
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required]
    });
    this.emailControl = this.loginForm.get('Email');
  }

  login() {
    const formValues = this.loginForm.value;
    this.submitted = true
    if (this.loginForm.invalid) {
      return;
    }
    sessionStorage.setItem('agentId', formValues.Email)
    this.commonService.checkEmail(formValues.Email).subscribe((response: any) => {
      if (response.status==true) {
        this.route.navigate(['all-customers'])
      } else {
        alert('User not found.');
      }
    });


  }
  get formControls() {
    return this.loginForm.controls;
  }
}
