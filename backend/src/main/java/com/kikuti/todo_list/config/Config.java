package com.kikuti.todo_list.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.kikuti.todo_list.repositories.SubjectRepository;

@Configuration
public class Config implements CommandLineRunner{
  
  @Autowired
  private SubjectRepository subjectRepository;

  @Override
  public void run(String... args) throws Exception {
  }
}
