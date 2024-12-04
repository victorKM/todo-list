package com.kikuti.todo_list.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.kikuti.todo_list.entities.Task;
import com.kikuti.todo_list.repositories.TaskRepository;
import com.kikuti.todo_list.services.exceptions.DatabaseException;
import com.kikuti.todo_list.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TaskService {
  
  @Autowired
  private TaskRepository taskRepository;

  public List<Task> findAll() {
    return taskRepository.findAll();
  }

  public Task findById(Long id) {
    Optional<Task> task = taskRepository.findById(id);
    return task.orElseThrow(() -> new ResourceNotFoundException(id));
  }

  public Task insert(Task task) {
    return taskRepository.save(task);
  }

  public Task update(Long id, Task task) {
    try {
      Task returnedTask = taskRepository.getReferenceById(id);
      update(returnedTask, task);
      return taskRepository.save(returnedTask);
    } catch(EntityNotFoundException e) {
      throw new ResourceNotFoundException(id);
    }
  }

  private void update(Task returnedTask, Task task) {
    if(task.getDescription() != null && !task.getDescription().isBlank()) {
      returnedTask.setDescription(task.getDescription());
    }

    if(task.getTitle() != null && !task.getTitle().isBlank()) {
      returnedTask.setTitle(task.getTitle());
    }

    if(task.getStatus() != null) {
      returnedTask.setStatus(task.getStatus());
    }
  }

  public void deleteById(Long id) {
    try {
      taskRepository.deleteById(id);
    } catch (DataIntegrityViolationException e) {
      throw new DatabaseException(e.getMessage());
    }
  }
}
