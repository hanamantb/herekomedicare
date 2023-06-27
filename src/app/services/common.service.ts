import { Injectable } from '@angular/core';
import {ApiProviderService} from "./api-provider.service";
import {Observable} from "rxjs";
import {UrlConstants} from "../utilities/UrlConstants";

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

  public searchPharmacy(zipcode:any,radius_miles="",page="0",count=5,name="",address=""): Observable<any> {
    return this.apiProvider.post(UrlConstants.searchPharmacy, {zipcode,radius_miles,page,count,address},'');
  }

  public drugDosage(rxcui:any,year="2023"): Observable<any> {
    return this.apiProvider.post(UrlConstants.drugDosage, {year,rxcui},'');
  }
  public searchPlans(searchPlanReqBody:any,plan_type:any,snp_type:any,
                     page=0,year="2023",fips="12099",
                     sort_order="ANNUAL_TOTAL",zip="33411"): Observable<any> {
    return this.apiProvider.post(UrlConstants.searchPlans, {searchPlanReqBody,plan_type,snp_type,
      page,year,fips,sort_order,zip},'');
  }
}
