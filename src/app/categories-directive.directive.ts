import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCategoriesDirective]'
})
export class CategoriesDirectiveDirective {
  @HostBinding('style.transform.scale') scaleCat:number = 1;
  constructor() { }
  @HostListener('mouseenter') mouseover(eventData:Event){
    this.scaleCat = 1.5;
  }
  @HostListener('mouseleave') mouseleave(eventData:Event){
    this.scaleCat = 1.5;
  }
}
