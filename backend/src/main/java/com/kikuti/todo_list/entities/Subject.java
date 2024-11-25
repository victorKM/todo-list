package com.kikuti.todo_list.entities;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tb_subject")
public class Subject {
  
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;
  private String subjectName;

  public Subject() {
  }

  public Subject(Long id, String subjectName) {
    this.id = id;
    this.subjectName = subjectName;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getSubjectName() {
    return subjectName;
  }

  public void setSubjectName(String subjectName) {
    this.subjectName = subjectName;
  }

  @Override
  public int hashCode() {
      int hash = 7;
      hash = 47 * hash + Objects.hashCode(this.subjectName);
      return hash;
  }

  @Override
  public boolean equals(Object obj) {
      if (this == obj) {
          return true;
      }
      if (obj == null) {
          return false;
      }
      if (getClass() != obj.getClass()) {
          return false;
      }
      final Subject other = (Subject) obj;
      return Objects.equals(this.subjectName, other.subjectName);
  }
}
