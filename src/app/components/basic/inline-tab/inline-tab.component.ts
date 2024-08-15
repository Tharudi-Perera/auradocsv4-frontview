import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';

@Component({
  selector: 'app-inline-tab',
  templateUrl: './inline-tab.component.html',
  styleUrls: ['./inline-tab.component.css']
})
export class InlineTabComponent implements AfterContentInit {
  @ContentChildren(TabItemComponent) tabs: QueryList<TabItemComponent>;

  activeTab: TabItemComponent;

  constructor() { }

  ngAfterContentInit() {
    this.changeActiveTab(this.tabs.first); // Set the first tab as active by default
  }

  changeActiveTab(tab: TabItemComponent) {
    this.tabs.forEach(t => t.isActive = false);
    this.activeTab = tab;
    this.activeTab.isActive = true;
  }
}
