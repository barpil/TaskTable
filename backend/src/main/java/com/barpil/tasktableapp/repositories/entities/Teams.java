package com.barpil.tasktableapp.repositories.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "teams")
@Setter
@Getter
@NoArgsConstructor
public class Teams {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private long id;

    @Column(name = "team_name", length = 100, nullable = false)
    private String name;

    @Column(name = "description", length = 500, nullable = true)
    private String description;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TeamMembers> members = new HashSet<>();

    @ManyToMany(mappedBy = "participantTeams")
    private Set<Projects> assignedProjects = new HashSet<>();

    private Teams(String name, String description){
        this.name = name;
        this.description = description;
    }

    public void addMember(Users user){
        TeamMembers newMember = new TeamMembers(user, this);
        this.members.add(newMember);
    }

    public static Teams createTeam(Users teamOwner, String teamName, String teamDescription){
        Teams createdTeam = new Teams(teamName, teamDescription);
        createdTeam.addMember(teamOwner);
        return createdTeam;
    }

}
