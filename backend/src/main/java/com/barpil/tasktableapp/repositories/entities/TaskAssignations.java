package com.barpil.tasktableapp.repositories.entities;

import com.barpil.tasktableapp.repositories.entities.complexids.TaskAssignationsId;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
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

    public TaskAssignations(Users user, Tasks task) {
        this.id = new TaskAssignationsId(user.getId(), task.getId());
        this.user = user;
        this.task = task;
    }
}

