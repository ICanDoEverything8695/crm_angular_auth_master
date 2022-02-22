import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const flyInOut = trigger('flyInOut', [
  state('show', style({transform: 'translateX(0)'})),
  transition('void => *', [
    animate(300, keyframes([
      style({opacity: 0, transform: 'translateX(-60px)', offset: 0}),
      style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
      style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
    ]))
  ]),
  transition('* => void', [
    animate(300, keyframes([
      style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
      style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
      style({opacity: 0, transform: 'translateX(60px)',  offset: 1.0})
    ]))
  ])
]);
