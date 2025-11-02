package com.barpil.tasktableapp.repositories.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "team_members")
public class TeamMembers {
    @EmbeddedId
    private TeamMembersId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @MapsId("teamId")
    @JoinColumn(name = "team_id")
    private Teams team;

    @Column(name = "join_date")
    private LocalDateTime joinDate = LocalDateTime.now();



    @Embeddable
    static class TeamMembersId implements Serializable {
        @Column(name = "user_id")
        private long userId;

        @Column(name = "team_id")
        private long teamId;

        @Override
        public boolean equals(Object o) {
            if (o == null || getClass() != o.getClass()) return false;
            TeamMembersId that = (TeamMembersId) o;
            return userId == that.userId && teamId == that.teamId;
        }

        @Override
        public int hashCode() {
            return Objects.hash(userId, teamId);
        }
    }
}
