import { DefaultWidgetRegistry } from 'angular2-schema-form';
import { MaStringWidgetComponent } from './ma-string-widget/ma-string-widget.component';
import { MaTextAreaWidgetComponent } from './ma-textarea-widget/ma-textarea-widget.component';

export class MaWidgetRegistry extends DefaultWidgetRegistry {
  constructor() {
    super();

    this.register('string',  MaStringWidgetComponent);
    this.register('textarea',  MaTextAreaWidgetComponent);
  }
}
