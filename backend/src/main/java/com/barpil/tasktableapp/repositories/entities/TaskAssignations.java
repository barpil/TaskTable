package com.barpil.tasktableapp.repositories.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "task_assignations")
public class TaskAssignations {
    @EmbeddedId
    private TaskAssignationsId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @MapsId("taskId")
    @JoinColumn(name = "task_id")
    private Tasks task;

    @Column(name = "assigned_date")
    private LocalDateTime assigned_date = LocalDateTime.now();


    @Embeddable
    static class TaskAssignationsId implements Serializable {
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
}
