import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IntegrationService } from '../../../core/services/integration.service';
import { SharedService } from '../../../shared/services/shared.service';
import {User} from '../../../core/models/user.model';

@Component({
  selector: 'crm-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
  providers: [IntegrationService]
})
export class IntegrationComponent implements OnInit {

  private routeSubscription;
  private me: User = new User();

  statusMessage = 'Please wait for integrating process...';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private integrationService: IntegrationService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.me = this.sharedService.getCurrentUser();
    this.getParams();
  }

  private getParams(): void {
    this.routeSubscription = Observable.combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams,
      (params, qparams) => ({ params, qparams }));

    this.routeSubscription.subscribe( ap => {
      this.integrationService.createNewIntegration(ap.params['intg_type'], ap.qparams['code']).subscribe(res => {
        this.statusMessage = 'Successfully integrated service. Now we are redirecting to integration page...';
        this.router.navigate(['/settings/integrations', this.me.org_id]);
      }, err => {
        this.statusMessage = err.msg;
      });
    });
  }
}
