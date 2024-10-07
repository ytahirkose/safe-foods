import {Injectable} from '@angular/core';
import {Company, CompanyResponse} from '../pages/welcome/Company';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  favouriteCompanies: Company[] = []

  private apiUrl = 'https://guvenilirgida.tarimorman.gov.tr/GuvenilirGida/GKD/DataTablesList';

  constructor(private http: HttpClient) {
  }

  getCompanies(param: string): Observable<CompanyResponse> {
    const body = new HttpParams()
      .set('draw', 1)
      .set('order[0][column]', '0')
      .set('order[0][dir]', 'desc')
      .set('start', '0')
      .set('length', '5000')
      .set('search[value]', param)
    return this.http.post<CompanyResponse>(this.apiUrl, body);
  }

  getFavouriteCompanies() {

  }

  setFavouriteCompany(company: Company) {

  }

}
