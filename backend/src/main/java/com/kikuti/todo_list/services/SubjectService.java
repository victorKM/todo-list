package com.kikuti.todo_list.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.kikuti.todo_list.entities.Subject;
import com.kikuti.todo_list.repositories.SubjectRepository;
import com.kikuti.todo_list.services.exceptions.DatabaseException;
import com.kikuti.todo_list.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class SubjectService {
  
  @Autowired
  private SubjectRepository subjectRepository;

  public List<Subject> findAll() {
    return subjectRepository.findAll();
  }

  public Subject findById(Long id) {
    Optional<Subject> subject = subjectRepository.findById(id);
    return subject.orElseThrow(() -> new ResourceNotFoundException(id));
  }

  public Subject insert(Subject subject) {
    return subjectRepository.save(subject);
  }

  public Subject update(Long id, Subject subject) {
    try { 
      Subject returnedSubject = subjectRepository.getReferenceById(id);
      update(returnedSubject, subject);
      return subjectRepository.save(returnedSubject);
    } catch(EntityNotFoundException e) {
      throw new ResourceNotFoundException(id);
    }
  }

  public void update(Subject returnedSubject, Subject subject) {
    if(subject.getName() != null && !subject.getName().isBlank()) {
      returnedSubject.setName(subject.getName());
    }
  }

  public void deleteById(Long id) {
    try {
      subjectRepository.deleteById(id); 
    } catch (DataIntegrityViolationException e) {
      throw new DatabaseException(e.getMessage());
    }
  }

}
