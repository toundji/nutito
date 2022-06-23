import { Component, OnInit } from '@angular/core';
declare var setAppBehavior: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setAppBehavior();
  }

}
