package com.barpil.tasktableapp.repositories.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "tasks")
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Enumerated(EnumType.STRING)
    private TaskState state;

    @OneToMany(mappedBy = "task")
    private Set<TaskAssignations> assignedUsers = new HashSet<>();

    public enum TaskState{
        TO_DO,
        IN_PROGRESS,
        DONE
    }

    private Tasks(Projects project, String name, String description) {
        this.project = project;
        this.name = name;
        this.description = description;
        this.state = TaskState.TO_DO;
    }

    public static Tasks createTask(Projects projectToAssignTo, String name, String description){
        return new Tasks(projectToAssignTo, name, description);
    }

    public void changeState(TaskState state){
        this.state = state;
    }

    public void assignUsers(List<Users> usersToAdd){
        this.assignedUsers = new HashSet<>();
        usersToAdd.forEach( user -> {
            this.assignedUsers.add(new TaskAssignations(user, this));
        });
    }

}
