package com.lr.taskmanagerapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.NestedServletException;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @ResponseStatus(value = HttpStatus.CREATED)
    @PostMapping("/task")
    public Task addTask(@RequestBody Task newTask) {
        return taskRepository.save(newTask);
    }

    @DeleteMapping("/task/{id}")
    public void deleteTask(@PathVariable(value = "id", required = true)int id) {
        int taskId = new Integer(id);
        taskRepository.deleteById(id);
    }
}
