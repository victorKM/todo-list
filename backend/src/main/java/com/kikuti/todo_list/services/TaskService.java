package com.kikuti.todo_list.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kikuti.todo_list.entities.Task;
import com.kikuti.todo_list.repositories.TaskRepository;

@Service
public class TaskService {
  
  @Autowired
  private TaskRepository taskRepository;

  public List<Task> findAll() {
    return taskRepository.findAll();
  }

  public Task findById(Long id) {
    Optional<Task> task = taskRepository.findById(id);
    return task.get();
  }

  public Task insert(Task task) {
    return taskRepository.save(task);
  }

  public Task update(Long id, Task task) {
    Task returnedTask = taskRepository.getReferenceById(id);
    update(returnedTask, task);
    return taskRepository.save(returnedTask);
  }

  private void update(Task returnedTask, Task task) {
    returnedTask.setDescription(task.getDescription());
    returnedTask.setTaskStatus(task.getTaskStatus());
    returnedTask.setTitle(task.getTitle());
  }

  public void delete(Long id) {
    taskRepository.deleteById(id);
  }

}
