import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { DataServiceService } from './services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ToDo2';
  constructor(private dataservice: DataServiceService) {}
  ngOnInit(): void {}

  onToggle(): void {
    document.body.classList.toggle('dark-theme');
    this.dataservice.toggleColorMode();
  }
}
