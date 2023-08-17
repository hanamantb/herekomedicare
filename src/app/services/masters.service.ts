import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlConstants} from '../helpers/UrlConstants';
import {Subject} from "rxjs";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Router} from "@angular/router";
import {AppConstants} from "../helpers/AppConstants";
import {CookieService} from "ngx-cookie-service";
import {CryptoService} from "../helpers/crypto.service";

@Injectable({
  providedIn: 'root'
})
export class MastersService {
  role = '';
  public fyiChange: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(private http: HttpClient, private route: Router, private cookie: CookieService,
              private cryptoService: CryptoService) {
    this.role = this.cryptoService.decryptData(this.cookie.get(AppConstants.role));
  }

  get events$() {
    return this.fyiChange.asObservable();
  }

  newEvent(event: any) {
    this.fyiChange.next(event);
  }

  summary() {
    let route = '';
    if (this.role === 'CPXREQ') {
      route = 'req-dash';
    } else if (this.role === 'CPXFH') {
      route = 'vp-dash';
    } else if (this.role === 'CPXHOAP') {
      route = 'cfo-dash';
    } else if (this.role === 'CPXADM') {
      route = 'admin-dash';
    } else {
      route = 'super-dash';
    }
    this.route.navigate([route])
  }
}
