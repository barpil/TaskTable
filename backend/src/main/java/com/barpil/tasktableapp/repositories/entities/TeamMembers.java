package com.barpil.tasktableapp.repositories.entities;

import com.barpil.tasktableapp.repositories.entities.complexids.TeamMembersId;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Table(name = "team_members")
@Getter
public class TeamMembers {
    @EmbeddedId
    private TeamMembersId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @MapsId("teamId")
    @JoinColumn(name = "team_id")
    private Teams team;

    @Column(name = "join_date")
    private LocalDateTime joinDate = LocalDateTime.now();

    public TeamMembers(Users teamOwner, Teams team) {
        this.user = teamOwner;
        this.team = team;
        this.id = new TeamMembersId(teamOwner.getId(), team.getId());
    }

    public TeamMembers() {}


}

