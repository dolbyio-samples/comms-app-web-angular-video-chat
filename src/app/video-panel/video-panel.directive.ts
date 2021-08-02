import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[videoHost]',
})
export class VideoPanelDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
