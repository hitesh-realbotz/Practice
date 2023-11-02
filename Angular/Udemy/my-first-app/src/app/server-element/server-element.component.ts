import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements 
  OnInit, OnChanges, DoCheck,
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked,
  OnDestroy {

  @Input('name') name: string;
  @ViewChild('heading') header: ElementRef; //Accessing local reference from html template
  @ContentChild('paraContent') paraContent: ElementRef; //Accessing local reference from component element's content present in parent component

  constructor() {
    console.log('constructor called');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called');
  }
  
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called');
    console.log('Para Content : ' + this.paraContent.nativeElement.textContent);
    // throw new Error('Method not implemented.');
  }
  ngAfterViewChecked(): void {
    console.log('AfterViewChecked called');
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit called');
    console.log('Text Content : ' + this.header.nativeElement.textContent);
    
    // throw new Error('Method not implemented.');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  // @Input() element: {type: string, name:string, content: string}
  @Input('servElement') element: { type: string, name: string, content: string }
  // @Input('servElement') element




}
