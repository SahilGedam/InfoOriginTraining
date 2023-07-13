import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor() {}
  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.container.data.length > 3) {
      transferArrayItem(
        // inbuild
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      transferArrayItem(
        // modified
        event.container.data,
        event.previousContainer.data,
        event.currentIndex + 1,
        event.previousIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
