import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input() description: string;
  @Output() deleted = new EventEmitter<void>();

  onClick() {
    this.deleted.emit();
  }
}
