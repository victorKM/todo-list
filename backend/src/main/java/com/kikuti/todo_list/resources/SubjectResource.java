package com.kikuti.todo_list.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.kikuti.todo_list.entities.Subject;
import com.kikuti.todo_list.services.SubjectService;


@RestController
@RequestMapping(value="/subjects")
public class SubjectResource {
  
  @Autowired
  private SubjectService subjectService;

  @GetMapping
  public ResponseEntity<List<Subject>> findAll() {
    List<Subject> subjects = subjectService.findAll();
    return ResponseEntity.ok().body(subjects);
  }

  @GetMapping(value="/{id}")
  public ResponseEntity<Subject> findById(@PathVariable Long id) {
    Subject subject = subjectService.findById(id);
    return ResponseEntity.ok().body(subject);
  }

  @PostMapping
  public ResponseEntity<Subject> insert(@RequestBody Subject subject) {
      Subject returnedSubject = subjectService.insert(subject);
      URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(returnedSubject.getId()).toUri();
      return ResponseEntity.created(uri).body(returnedSubject);
  }

  @PutMapping(value="/{id}")
  public ResponseEntity<Subject> update(@PathVariable Long id, @RequestBody Subject subject) {
    Subject updatedSubject = subjectService.update(id, subject);
    return ResponseEntity.ok().body(updatedSubject);
  }

  @DeleteMapping(value="/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    subjectService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
  
}
