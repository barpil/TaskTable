package com.barpil.tasktableapp.repositories.entities;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "projects")
public class Projects {
    @Id
    @Column(name = "project_id")
    private long id;

    @Column(name = "project_name", length = 100, nullable = false)
    private String name;

    @Column(name = "description", length = 500, nullable = true)
    private String description;

    @Column(name = "project_state", length = 11)
    private ProjectState state;

    @ManyToMany
    @JoinTable(
            name = "project_participant_teams",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    private Set<Teams> participantTeams = new HashSet<>();


    enum ProjectState{
        DONE("DONE"),
        IN_PROGRESS("IN PROGRESS");

        private final String value;

        ProjectState(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return value;
        }
    }
}
