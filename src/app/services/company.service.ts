import {Injectable, OnInit} from '@angular/core';
import {Company} from '../pages/welcome/Company';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CompanyService implements OnInit {
  body = new HttpParams()
    .set('draw', 1)
    .set('order[0][column]', '0')
    .set('order[0][dir]', 'desc')
    .set('start', '0')
    .set('length', '5000')

  favouriteCompanies: Company[] = []

  private apiUrl = 'https://guvenilirgida.tarimorman.gov.tr/GuvenilirGida/GKD/DataTablesList';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const d: Date = new Date();
    d.setTime(d.getTime() + 100 * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const cpath = '';
    document.cookie = `Dil479=1; ${expires}${cpath}; SameSite=Lax`;
  }

  getCompanies(param: string): Observable<any> {
    this.body.set('search[value]', param)
    return this.http.post(this.apiUrl, this.body);
  }

  getFavouriteCompanies() {

  }

  setFavouriteCompany(company: Company) {

  }

}
