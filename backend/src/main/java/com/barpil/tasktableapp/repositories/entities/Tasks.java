package com.barpil.tasktableapp.repositories.entities;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tasks")
public class Tasks {
    @Id
    @Column(name = "task_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Projects project;

    @Column(name = "task_name", length = 255, nullable = false)
    private String name;

    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "task_state", length = 11, nullable = false)
    private TaskState state;

    @OneToMany(mappedBy = "task")
    private Set<TaskAssignations> assignedUsers = new HashSet<>();

    enum TaskState{
        TO_DO("TO DO"),
        IN_PROGRESS("IN PROGRESS"),
        DONE("DONE");

        private final String value;

        TaskState(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return value;
        }
    }

}
