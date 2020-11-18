import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bpa-application',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'Loading...';

  constructor(private http: HttpClient, private translate: TranslateService, private titleService: Title) {
  }

  ngOnInit() {
    this.http.get('./assets/i18n/lang.json')
      .subscribe((langMap) => {
        const langCodeList = Object.keys(langMap);
        this.translate.addLangs(langCodeList);
        console.log('> Debug: available languages =>', langCodeList);
      });

    this.translate.get('app.title')
      .subscribe(title => {
        this.title = title;
        this.titleService.setTitle(title);
      });
  }
}
