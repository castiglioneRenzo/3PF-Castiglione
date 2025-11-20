import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[titleSize]',
  standalone: false
})
export class TitleSizeDirective implements OnInit {

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.element.nativeElement.style.fontSize = '20px';
    this.element.nativeElement.style.fontWeight = 'bold';
  }
}