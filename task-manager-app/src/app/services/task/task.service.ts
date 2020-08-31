import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Subject } from 'rxjs';
import { Task } from '../../model/task';
import { TaskListComponent } from 'src/app/components/task-list/task-list.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private newTasks: Subject<Task> = new Subject();
  newTasks$ = this.newTasks.asObservable();

  private deletedTasks: Subject<Task> = new Subject();
  deletedTasks$ = this.deletedTasks.asObservable();

  private errors: Subject<string> = new Subject();
  errors$ = this.errors.asObservable();

  constructor(private apiService: ApiService) { }

  getTasks() {
    return this.apiService.get('/tasks');
  }

  saveTask(task: Task) {
    this.apiService.post('/task', task).subscribe(
      (addedTask: Task) => {
        this.newTasks.next(addedTask);
      },
      () => {
        this.errors.next('There was an error saving your new Task');
      }
    );
  }

  deleteTask(task: Task) {
    this.apiService.delete(`/task/${task.id}`).subscribe(
      () => {
        this.deletedTasks.next(task);
      },
      () => {
        this.errors.next('There was an error deleting the selected task');
      }
    );
  }

  propagateError(newError: string) {
    this.errors.next(newError);
  }
}
