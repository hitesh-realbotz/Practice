import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]',
    exportAs: 'appDropdown'
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    // Closing the Dropdown From Anywhere
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    // Closing the Dropdown From Element itself
    // @HostListener('click') toggleOpen() {
    //     this.isOpen = !this.isOpen;
    // }

    // constructor(private elRef: ElementRef,private renderer: Renderer2) {}
    constructor(private elRef: ElementRef) { }


}


