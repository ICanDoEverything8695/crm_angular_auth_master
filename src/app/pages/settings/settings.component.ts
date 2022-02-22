import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';

import { userRoles } from '../../core/user_roles';

@Component({
  selector: 'crm-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userRoles = userRoles;

  myOrgId = 0;

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.myOrgId = this.sharedService.getCurrentUser().org_id;
  }

}
