package com.kikuti.todo_list.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.kikuti.todo_list.entities.Task;
import com.kikuti.todo_list.services.TaskService;

@Controller
@RequestMapping(value="/tasks")
public class TaskResource {

  @Autowired
  private TaskService taskService;

  @GetMapping
  public ResponseEntity<List<Task>> findAll() {
    List<Task> tasks = taskService.findAll();
    return ResponseEntity.ok().body(tasks);
  }

  @GetMapping(value="/{id}")
  public ResponseEntity<Task> findById(@PathVariable Long id) {
    Task task = taskService.findById(id);
    return ResponseEntity.ok().body(task);
  }

  @PostMapping
  public ResponseEntity<Task> insert(@RequestBody Task task) {
    Task returnedTask = taskService.insert(task);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(returnedTask.getId()).toUri();
    return ResponseEntity.created(uri).body(returnedTask);
  }

  @PutMapping(value="/{id}")
  public ResponseEntity<Task> update(@PathVariable Long id, @RequestBody Task task) {
    Task updatedTask = taskService.update(id, task);
    return ResponseEntity.ok().body(updatedTask);
  }

  @DeleteMapping(value="/{id}") 
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    taskService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
