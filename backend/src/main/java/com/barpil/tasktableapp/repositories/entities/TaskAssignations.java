package com.barpil.tasktableapp.repositories.entities;

import com.barpil.tasktableapp.repositories.entities.complexids.TaskAssignationsId;
import jakarta.persistence.*;

import java.time.LocalDateTime;

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

}

