import { Component } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css'],
})
export class InputBoxComponent {
  constructor(private dataservice: DataServiceService) {}
  form = {
    task: '',
  };
  registerFn() {
    console.log(this.form.task);
    this.dataservice.data.push({
      id: Math.floor((Math.random() * 10) + 1),
      task: this.form.task,
    });
  }
  clearFn() {
    this.form.task = '';
  }
}
