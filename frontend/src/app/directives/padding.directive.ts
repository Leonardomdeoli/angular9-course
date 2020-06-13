import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPadding]'
})
export class PaddingDirective implements OnInit {

  @Input()
  public size: String;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.el.nativeElement.style.padding = (this.size ? this.size : '0') + 'px';
  }
}
