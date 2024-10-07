import { Injectable } from '@angular/core';
import {Company} from '../pages/welcome/Company';

@Injectable({
  providedIn: 'root'
})

export class CompaniesService {

  favouriteCompanies: Company[] = []

  getFavouriteCompanies() {

  }

  setFavouriteCompany(company) {

  }

  constructor() { }
}
