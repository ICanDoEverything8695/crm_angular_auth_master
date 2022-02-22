import { Component } from '@angular/core';
import { TextAreaWidget } from 'angular2-schema-form';

@Component({
  selector: 'crm-ma-textarea-widget',
  template: `
    <mat-form-field class="schema-form-input">
      <textarea matInput
             [placeholder]="schema.description" 
             [name]="name" 
             [attr.readonly]="schema.readOnly?true:null" 
             [attr.id]="id" [attr.disabled]="schema.readOnly?true:null" 
                [formControl]="control"></textarea>
    </mat-form-field>
  `,
  styles: []
})
export class MaTextAreaWidgetComponent extends TextAreaWidget {}
