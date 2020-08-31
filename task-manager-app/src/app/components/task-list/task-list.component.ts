import { Component, OnDestroy } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from '../../services/task/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnDestroy {

  tasks: Task[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private taskService: TaskService) {
    this.subscriptions.add(this.taskService.getTasks().subscribe(
      (taskList: Task[]) => {
        this.tasks = taskList;
      },
      () => {
        this.taskService.propagateError('There was an error getting tasks');
      }
    ));

    this.subscriptions.add(this.taskService.newTasks$.subscribe((newTask: Task) => {
      this.tasks.push(newTask);
    }));

    this.subscriptions.add(this.taskService.deletedTasks$.subscribe((deletedTask: Task) => {
      this.tasks = this.tasks.filter(task => task !== deletedTask);
    }));
  }

  delete(taskToDelete: Task) {
    this.taskService.deleteTask(taskToDelete);
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
