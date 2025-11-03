package com.barpil.tasktableapp.repositories.entities.complexids;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TaskAssignationsId implements Serializable {
    @Column(name = "user_id")
    private long userId;
    @Column(name = "task_id")
    private long taskId;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        TaskAssignationsId that = (TaskAssignationsId) o;
        return userId == that.userId && taskId == that.taskId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, taskId);
    }
}
