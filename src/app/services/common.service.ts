import { Injectable } from '@angular/core';
import {ApiProviderService} from "./api-provider.service";
import {Observable} from "rxjs";
import {UrlConstants} from "../utilities/UrlConstants";
import { InjectionToken } from '@angular/core';

export const COMMON_SERVICE_TOKEN = new InjectionToken('COMMON_SERVICE_TOKEN');

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private apiProvider: ApiProviderService) {

  }

  public getCounties(zipcode:any): Observable<any> {
    return this.apiProvider.post(UrlConstants.zipCode, {zipcode},'');
  }

  public drugByLetter(letter:any,year="2023"): Observable<any> {
    return this.apiProvider.post(UrlConstants.drugByLetter, {letter,year},'');
  }

  public searchDrug(name:any,year="2023"): Observable<any> {
    return this.apiProvider.post(UrlConstants.searchDrug, {name,year},'');
  }

  public searchPharmacy(zipcode:any,radius_miles="",address="",page:any,count:any,name=""): Observable<any> {
    return this.apiProvider.post(UrlConstants.searchPharmacy, {zipcode,radius_miles,page,count,address},'');
  }

  public drugDosage(rxcui:any,year="2023"): Observable<any> {
    return this.apiProvider.post(UrlConstants.drugDosage, {year,rxcui},'');
  }
  public searchPlans(searchPlanReqBody:any,plan_type:any,snp_type:any,zip:any,fips:any,
                     page:any,isDrugAdded=true,year="2023",
                     sort_order="ANNUAL_TOTAL"): Observable<any> {
    return this.apiProvider.post(UrlConstants.searchPlans, {searchPlanReqBody,plan_type,snp_type,
      page,year,fips,sort_order,zip,isDrugAdded},'');
  }
  public checkEmail(email: any): Observable<any> {
    let s = this.apiProvider.get(UrlConstants.checkEmail + email);
    console.log(s)
    return s;

  }
}
