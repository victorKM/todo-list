package com.kikuti.todo_list.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kikuti.todo_list.entities.Subject;
import com.kikuti.todo_list.repositories.SubjectRepository;

@Service
public class SubjectService {
  
  @Autowired
  private SubjectRepository subjectRepository;

  public List<Subject> findAll() {
    return subjectRepository.findAll();
  }

  public Subject findById(Long id) {
    Optional<Subject> subject = subjectRepository.findById(id);
    return subject.get();
  }

  public Subject insert(Subject subject) {
    return subjectRepository.save(subject);
  }

  public Subject update(Long id, Subject subject) {
    Subject returnedSubject = subjectRepository.getReferenceById(id);
    update(returnedSubject, subject);
    return subjectRepository.save(returnedSubject);
  }

  public void update(Subject returnedSubject, Subject subject) {
    returnedSubject.setSubjectName(subject.getSubjectName());
  }

  public void deleteById(Long id) {
    subjectRepository.deleteById(id);
  }

}
