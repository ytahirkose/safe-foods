import {Component, OnInit} from '@angular/core';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzAlertComponent} from 'ng-zorro-antd/alert';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NgStyle} from '@angular/common';
import {NzListComponent, NzListItemComponent} from 'ng-zorro-antd/list';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {Company, CompanyResponse} from './Company';
import {CompanyService} from '../../services/company.service';
import {OptionType} from '../../services/OptionType';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    NzSelectComponent,
    FormsModule,
    NzOptionComponent,
    NzSpinComponent,
    NzAlertComponent,
    NzIconDirective,
    NgStyle,
    NzListComponent,
    NzListItemComponent,
    NzTypographyComponent
  ],
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

  isLoading = false;
  selectedValue = null;
  listOfOption: OptionType[] = [];
  nzFilterOption = (): boolean => true;
  lastResult: Company[] = [];
  selectedCompanyDetails: Company[] = [];

  constructor(private httpClient: HttpClient, private companyService: CompanyService) {}

  ngOnInit() {
  }

  select() {
    this.selectedCompanyDetails = this.lastResult.filter(item => this.selectedValue === item.FirmaAdi);
  }

  search(value: string): void {
    this.isLoading = true;

    const body = new HttpParams()
      .set('draw', 1)
      .set('order[0][column]', '0')
      .set('order[0][dir]', 'desc')
      .set('start', '0')
      .set('length', '5000')
      .set('search[value]', value)

    this.companyService.getCompanies(value)
      .subscribe(response => {
        this.lastResult = response.data;
        const listOfOption: Array<OptionType> = [];
        response.data.forEach((item: Company) => {
          if (!listOfOption.filter(el => el.value === item.FirmaAdi).length) {
            listOfOption.push({
              value: item.FirmaAdi,
              text: item.FirmaAdi
            });
          }
        });
        this.listOfOption = listOfOption;
        this.isLoading = false;
      });
  }
}
