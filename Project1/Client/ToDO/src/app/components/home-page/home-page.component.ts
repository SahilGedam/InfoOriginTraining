import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log('on init home page');
  }
}
