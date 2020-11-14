import { Component, OnInit } from '@angular/core';
import { HomeStateFacadeService } from './home-state-facade.service';
import { HomeToolbarCommand } from './home-view.models';


@Component({
  selector: 'bpa-home-view',
  template: `
    <section class="mat-body page-body">
      <bpa-toolbar [toolbar]="toolbar$ | async" (execute)="toolbarExecute($event)"></bpa-toolbar>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </section>
  `,
  styleUrls: ['./home-view.component.scss'],
  providers: [
    HomeStateFacadeService,
  ]
})
export class HomeViewComponent implements OnInit {

  toolbar$ = this.homeState.getToolButtonList$();

  constructor(private homeState: HomeStateFacadeService) { }

  ngOnInit(): void {
  }

  toolbarExecute(command: string): void {
    switch (command) {
      case HomeToolbarCommand.UserAccount:
        break;
      case HomeToolbarCommand.EditorBureau:
        this.homeState.navigateToEditor();
        break;
      case HomeToolbarCommand.AccountManager:
        break;
      case HomeToolbarCommand.Logout:
        this.homeState.confirmLogout();
        break;
      default:
        console.log('>> Debug: "%s"', command);
        break;
    }
  }
}
