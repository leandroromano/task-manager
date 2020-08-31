import { Component, OnDestroy } from '@angular/core';
import { TaskService } from './services/task/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  error = '';
  subscription: Subscription;

  constructor(private taskService: TaskService) {
    this.subscription = this.taskService.errors$.subscribe((errorMsg) => {
      this.error = errorMsg;
      setTimeout(() => {
        this.error = '';
      }, 10000);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
