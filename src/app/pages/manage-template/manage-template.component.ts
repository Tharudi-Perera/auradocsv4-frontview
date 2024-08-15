import { Component, OnInit } from '@angular/core';
import { AdminApiService } from 'src/app/services/admin/admin-api.service';

@Component({
  selector: 'app-manage-template',
  templateUrl: './manage-template.component.html',
  styleUrls: ['./manage-template.component.css'],
})
export class ManageTemplateComponent implements OnInit {
  activeElement: string;

  constructor(private adminApiService: AdminApiService) {}

  changesActiveAccordion(tabName: string) {
    this.activeElement = tabName;
  }

  ngOnInit(): void {}
}
