package com.kikuti.todo_list.entities.enums;

public enum TaskStatus {
  
  TODO(1),
  DOING(2),
  FINISHED(3);

  private int code;

  private TaskStatus(int code) {
    this.code = code;
  }

  public int getCode() {
    return code;
  }

  public static TaskStatus valueOf(int code) {
    for (TaskStatus value : TaskStatus.values()) {
      if(value.getCode() == code) {
        return value;
      }
    }
    throw new IllegalArgumentException("Invalid TaskStatus Code");
  }
}
