package com.kikuti.todo_list.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kikuti.todo_list.entities.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long>{
  
}
