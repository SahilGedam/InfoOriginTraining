import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
@Component({
  selector: 'app-box1',
  templateUrl: './box1.component.html',
  styleUrls: ['./box1.component.css']
})
export class Box1Component {
  @Input() arrayDataBox1: string[] = [];
  @Input() box1deActivated = true;

  constructor(private ss: ShareService) { }
  onDrop(event: CdkDragDrop<string[]>) {
    this.ss.drop(event);
  }
}
