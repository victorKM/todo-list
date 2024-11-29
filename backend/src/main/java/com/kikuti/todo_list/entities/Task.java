package com.kikuti.todo_list.entities;

import com.kikuti.todo_list.entities.enums.TaskStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="tb_task")
public class Task {
  
  private Long id;
  private String title;
  private String description;
  private Integer taskStatus;

  public Task() {
  }

  public Task(Long id, String title, String description, TaskStatus taskStatus) {
    this.id = id;
    this.title = title;
    this.description = description;
    setTaskStatus(taskStatus);
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

  public TaskStatus getTaskStatus() {
    return TaskStatus.valueOf(taskStatus);
  }

  public void setTaskStatus(TaskStatus taskStatus) {
    if(taskStatus != null) {
      this.taskStatus = taskStatus.getCode();
    }
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
