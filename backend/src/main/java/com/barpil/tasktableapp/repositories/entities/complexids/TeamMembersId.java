package com.barpil.tasktableapp.repositories.entities.complexids;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeamMembersId implements Serializable {
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
