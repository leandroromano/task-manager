import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Task } from '../../model/task';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-task-generator',
  templateUrl: './task-generator.component.html',
  styleUrls: ['./task-generator.component.css']
})
export class TaskGeneratorComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.form = this.fb.group({
      task: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get invalidTask() {
    const taskControl = this.form.get('task');
    return taskControl.invalid && taskControl.dirty;
  }

  save() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control: FormControl) => {
        control.markAsDirty();
      });
    } else {
      const newTask: Task = {
        description: this.form.get('task').value
      };
      this.taskService.saveTask(newTask);
      this.form.reset();
    }
  }

}
