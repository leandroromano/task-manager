import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskGeneratorComponent } from './components/task-generator/task-generator.component';
import { TaskComponent } from './components/task/task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { TaskService } from './services/task/task.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskGeneratorComponent,
    TaskComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ApiService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
