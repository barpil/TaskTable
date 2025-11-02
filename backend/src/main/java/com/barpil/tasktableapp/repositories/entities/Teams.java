package com.barpil.tasktableapp.repositories.entities;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "teams")
public class Teams {
    @Id
    @Column(name = "team_id")
    private long id;

    @Column(name = "team_name", length = 100, nullable = false)
    private String name;

    @Column(name = "description", length = 500, nullable = true)
    private String description;

    @OneToMany(mappedBy = "team")
    private Set<TeamMembers> members = new HashSet<>();

    @ManyToMany(mappedBy = "participantTeams")
    private Set<Projects> assignedProjects = new HashSet<>();

}
