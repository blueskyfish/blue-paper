import { Component, Input, OnInit } from '@angular/core';
import { TextContent } from './content-panel.models';

@Component({
  selector: 'bpa-content-panel',
  templateUrl: './content-panel.component.html',
  styleUrls: ['./content-panel.component.scss']
})
export class ContentPanelComponent implements OnInit {

  @Input()
  text: TextContent = null;

  constructor() { }

  ngOnInit(): void {
  }

}
