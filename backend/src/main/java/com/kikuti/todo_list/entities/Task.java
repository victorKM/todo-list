package com.kikuti.todo_list.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kikuti.todo_list.entities.enums.TaskStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name="tb_task")
public class Task {
  
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;
  
  private String title;
  private String description;
  private Integer status;

  @ManyToOne
  @JoinColumn(name = "subject_id")
  private Subject subject;

  public Task() {
  }

  public Task(Long id, String title, String description, TaskStatus status, Subject subject) {
    this.id = id;
    this.title = title;
    this.description = description;
    setStatus(status);
    this.subject = subject;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public TaskStatus getStatus() {
    if(this.status == null) {
      return null;
    }
    return TaskStatus.valueOf(status);
  }

  public void setStatus(TaskStatus status) {
    if(status != null) {
      this.status = status.getCode();
    }
  }

  public Subject getSubject() {
    return subject;
  }

  public void setSubject(Subject subject) {
    this.subject = subject;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((title == null) ? 0 : title.hashCode());
    result = prime * result + ((description == null) ? 0 : description.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    Task other = (Task) obj;
    if (title == null) {
      if (other.title != null)
        return false;
    } else if (!title.equals(other.title))
      return false;
    if (description == null) {
      if (other.description != null)
        return false;
    } else if (!description.equals(other.description))
      return false;
    return true;
  }
}
