import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { User, Organization } from '../../../core/models';
import { UserService, OrganizationService } from '../../../core/services';
import { SharedService } from '../../../shared/services/shared.service';
import { userRoles } from '../../../core/user_roles';

import { EditUserModalComponent } from '../';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'crm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  newUser: User = new User();
  users: User[] = [];
  me: User = new User();

  organization: Organization = new Organization();
  organizations: Organization[] = [];

  USER_ROLES = userRoles;
  roles: string[] = [];

  private org$: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private organizationService: OrganizationService
  ) { }

  ngOnInit() {
    this.me = this.sharedService.getCurrentUser();
    this.getRouterSegments();
  }

  ngOnDestroy() {
  }

  onAddNewUser(): void {
    this.sharedService.setFspl(true);
    this.newUser.organization_id = this.organization.id;
    this.userService.createUser(this.newUser).subscribe(res => {
      this.sharedService.showSuccessMessage('New user successfully created.');
      this.getUsers();
      this.sharedService.setFspl(false);
    }, err => {
      this.sharedService.setFspl(false);
      this.sharedService.showSuccessMessage('Sorry, failed to create user.')
    });
  }

  onDeleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sharedService.setFspl(true);
        this.userService.deleteUser(user.public_id).subscribe(res => {
          this.getUsers();
          this.sharedService.setFspl(false);
          this.sharedService.showSuccessMessage('Successfully deleted user.');
        }, err => {
          this.sharedService.setFspl(false);
          this.sharedService.showSuccessMessage('Sorry, failed to delete existing user.');
        });
      }
    });
  }

  onSelectOrganization(): void {
    this.router.navigate(['settings/organizations', this.organization.id]);
  }

  onEditUser(user: User): void {
    this.router.navigate(['.'], { queryParams: { userId: user.public_id }, relativeTo: this.activatedRoute });
  }

  onResendCode(user: User): void {
    this.sharedService.setFspl(true);
    this.userService.resendVerifyCode(user.email).subscribe(res => {
      this.sharedService.setFspl(false);
      this.sharedService.showSuccessMessage('Verification message successfully sent.');
    }, err => {
      this.sharedService.setFspl(false);
      this.sharedService.showSuccessMessage('Failed to send message. Please try again later.');
    });
  }

  onRestoreUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sharedService.setFspl(true);
        this.userService.restoreUser(user.public_id).subscribe(res => {
          this.getUsers();
          this.sharedService.setFspl(false);
          this.sharedService.showSuccessMessage('Successfully restored user.');
        }, err => {
          this.sharedService.setFspl(false);
          this.sharedService.showSuccessMessage('Sorry, failed to restore existing user.');
        });
      }
    });
  }

  private openEditUserModal(user: User): void {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      data: { user: user, roles: this.roles },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['settings/organizations', this.organization.id]);
      if (result) {
        this.getUsers();
      }
    });
  }

  private getOrganizations(init_org_id: number): void {
    this.organizationService.getOrganizationsD().subscribe(res => {
      this.organizations = res.filter(x => !x.is_deleted);
      if (this.organizations.length) {
        this.organization = this.organizations.find(x => x.id === init_org_id);
        this.getUsers();
        this.getRoles();
      }
    }, err => {
      this.sharedService.showSuccessMessage('Sorry, we can not get organizations.');
    });
  }

  private getUsers(): void {
    this.organizationService.getUsersByOrganizationId(this.organization.id).subscribe(res => {
      this.users = res;
    }, err => {
      this.sharedService.showSuccessMessage('Sorry, we can not get organization information.');
    });
  }

  private getRoles(): void {
    this.userService.getUserRolesByOrganizationTypeId(this.organization.org_type_id).subscribe(res => {
      this.roles = [];
      res.map(x => {this.roles.push(x.name)});
    }, err => {
      this.sharedService.showSuccessMessage('Sorry, we can not get user roles.');
    })
  }

  private getRouterSegments(): void {

    this.activatedRoute.params.subscribe(params => {

      console.log('%c Organization Id has been updated.', 'color: blue');
      this.organization.id = params.org_id;
      // continue
      if (this.me.user_role === userRoles.KA) {
        this.getOrganizations(+params.org_id);
      } else {
        this.organizationService.getOrganizationById(this.me.org_id).subscribe(res => {
          this.organization = res;
          this.getUsers();
          this.getRoles();
          this.onSelectOrganization();
        }, err => {
          this.sharedService.showSuccessMessage('Sorry, We can not get your organization data.');
        });
      }
    });

    // check query parameters
    this.activatedRoute.queryParams.subscribe(qParams => {
      if (qParams.userId) {

        console.log('%c Query Parameter UserID has been updated.', 'color: green');

        this.organizationService.getUserFromOrgByUserId(this.organization.id, qParams.userId).subscribe((res: User) => {
          this.openEditUserModal(res);
        }, err => {
          this.sharedService.showSuccessMessage('Failed to get User Data. Please try again later.')
        });
      }
    });

  }
}
