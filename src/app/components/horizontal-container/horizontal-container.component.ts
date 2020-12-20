import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-container',
  templateUrl: './horizontal-container.component.html',
  styleUrls: ['./horizontal-container.component.css']
})
export class HorizontalContainerComponent implements OnInit {

  @Input()
  bckg_color:string;

  constructor() { }

  ngOnInit(): void {
  }

}
