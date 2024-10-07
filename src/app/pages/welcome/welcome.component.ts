import {Component, OnInit} from '@angular/core';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzAlertComponent} from 'ng-zorro-antd/alert';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NgStyle} from '@angular/common';
import {NzListComponent, NzListItemComponent} from 'ng-zorro-antd/list';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';

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
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = (): boolean => true;
  lastResult: any[] = [];
  selectedCampaignDetails: any[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const d: Date = new Date();
    d.setTime(d.getTime() + 100 * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const cpath = '';
    document.cookie = `Dil479=1; ${expires}${cpath}; SameSite=Lax`;
  }

  select() {
    this.selectedCampaignDetails = this.lastResult.filter(item => this.selectedValue === item.FirmaAdi);
    console.log(this.selectedCampaignDetails);
  }

  search(value: string): void {
    const body = new HttpParams()
      .set('draw', 1)
      .set('order[0][column]', '0')
      .set('order[0][dir]', 'desc')
      .set('start', '0')
      .set('length', '5000')
      .set('search[value]', value)

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.isLoading = true;

    this.httpClient
      .post<{ data: any[] }>(`https://guvenilirgida.tarimorman.gov.tr/GuvenilirGida/GKD/DataTablesList`, body)
      .subscribe(data => {
        this.lastResult = data.data;
        const listOfOption: Array<{ value: string; text: string }> = [];
        data.data.forEach(item => {
          if (!listOfOption.filter(el => el.value === item.FirmaAdi).length) {
            listOfOption.push({
              value: item.FirmaAdi,
              text: item.FirmaAdi
            } as any);
          }
        });
        this.listOfOption = listOfOption;
        this.isLoading = false;
      });
  }

  protected readonly console = console;
  protected readonly event = event;
}
