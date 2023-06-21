import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css'],
})
export class InputBoxComponent implements OnInit {
  constructor(private dataservice: DataServiceService) {}
  ngOnInit(): void {
  console.log("on init of");
  
  }
  form = {
    task: '',
  };
  registerFn() {
    let taskSent = {
      task: this.form.task,
    };
    console.log(this.form.task);
    this.dataservice.saveData(taskSent).subscribe((data) => {
      console.log(data);
    });
  }
  clearFn() {
    this.form.task = '';
  }
}
