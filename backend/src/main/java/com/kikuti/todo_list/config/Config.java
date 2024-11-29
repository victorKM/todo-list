package com.kikuti.todo_list.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.kikuti.todo_list.entities.Subject;
import com.kikuti.todo_list.entities.Task;
import com.kikuti.todo_list.entities.enums.TaskStatus;
import com.kikuti.todo_list.repositories.SubjectRepository;
import com.kikuti.todo_list.repositories.TaskRepository;

@Configuration
public class Config implements CommandLineRunner{
  
  @Autowired
  private SubjectRepository subjectRepository;

  @Autowired
  private TaskRepository taskRepository;

  @Override
  public void run(String... args) throws Exception {

    Subject subject = new Subject(null, "History");

    subjectRepository.saveAll(Arrays.asList(subject));

    Task task = new Task(null, "Study to the test", "Test is tomorrow", TaskStatus.TODO, subject);

    taskRepository.saveAll(Arrays.asList(task));

  }
}
