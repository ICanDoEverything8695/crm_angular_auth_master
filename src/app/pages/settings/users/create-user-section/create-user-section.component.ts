import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../../../core/models';

@Component({
  selector: 'crm-create-user-section',
  templateUrl: './create-user-section.component.html',
  styleUrls: ['./create-user-section.component.scss']
})
export class CreateUserSectionComponent implements OnInit {

  @Input() user: User = new User();
  @Input() me: User = new User();
  @Input() roles: String[];
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  submit(): void {
    this.onCreate.emit();
  }
}
