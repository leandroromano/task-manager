package com.lr.taskmanagerapi;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface TaskRepository extends Repository<Task, Integer> {
    List<Task> findAll();
    Task save(Task newTask);
    void deleteById(int id);
}
