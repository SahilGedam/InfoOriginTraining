import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-box2',
  templateUrl: './box2.component.html',
  styleUrls: ['./box2.component.css']
})
export class Box2Component {
  @Input() arrayDataBox2: string[] = [];
  @Input() box2deActivated = true;
  constructor(private ss: ShareService) { }
  onDrop(event: CdkDragDrop<string[]>) {
    this.ss.drop(event);
  }
}
