package com.barpil.tasktableapp.repositories.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
public class Projects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private long id;

    @Column(name = "project_name", length = 100, nullable = false)
    private String name;

    @Column(name = "description", length = 500, nullable = true)
    private String description;

    @Column(name = "project_state", length = 11)
    @Enumerated(EnumType.STRING)
    private ProjectState state;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id", nullable = false)
    private Users owner;

    @ManyToMany
    @JoinTable(
            name = "project_participant_teams",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    @JsonIgnore
    private Set<Teams> participantTeams = new HashSet<>();


    public static Projects createProject(String name, String description, Teams creatingTeam){
        Projects projects = new Projects();
        projects.setName(name);
        projects.setDescription(description);
        projects.setOwner(creatingTeam.getOwner());
        projects.setState(ProjectState.IN_PROGRESS);
        projects.getParticipantTeams().add(creatingTeam);
        return projects;
    }

    enum ProjectState {
        DONE,
        IN_PROGRESS
    }

}
