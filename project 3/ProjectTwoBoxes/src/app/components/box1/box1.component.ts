import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-box1',
  templateUrl: './box1.component.html',
  styleUrls: ['./box1.component.css']
})
export class Box1Component {
  @Input() arrayDataBox1: string[] = [];
  @Input() box1deActivated = true;
}
