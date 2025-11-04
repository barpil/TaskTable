package com.barpil.tasktableapp.controllers.rest.dto;

import com.barpil.tasktableapp.repositories.entities.TeamMembers;
import com.barpil.tasktableapp.repositories.entities.Teams;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class GetTeamsResponse {
    private List<TeamAndJoinDate> teams;

    public GetTeamsResponse(List<TeamMembers> teamMembers) {
        this.teams = teamMembers.stream()
                .map(teamMember ->new TeamAndJoinDate(teamMember.getTeam(), teamMember.getJoinDate()))
                .toList();
    }

    @Data
    @JsonPropertyOrder({ "team", "join_date" })
    static class TeamAndJoinDate {
        private TeamInfo team;
        @JsonProperty("join_date")
        private LocalDateTime joinDate;

        TeamAndJoinDate(Teams team, LocalDateTime joinDate) {
            this.team = new TeamInfo(team.getId(), team.getName(), team.getDescription(), team.getOwner().getEmail());
            this.joinDate = joinDate;
        }

        @Data
        @JsonPropertyOrder({ "team_id", "name", "description", "owner" })
        @AllArgsConstructor
        static class TeamInfo{
            @JsonProperty("team_id")
            private Long teamId;
            @JsonProperty("name")
            private String teamName;
            private String description;
            private String owner;

        }
    }
}
