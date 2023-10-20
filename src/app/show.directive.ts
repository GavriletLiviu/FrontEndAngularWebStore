import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector:'[appShow]'
})

export class ShowDialogueDirective{
    @HostBinding('class.open-overlay') isOpen = false;
    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }
}
