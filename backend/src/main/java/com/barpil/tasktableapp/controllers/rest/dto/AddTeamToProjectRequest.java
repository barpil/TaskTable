package com.barpil.tasktableapp.controllers.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AddTeamToProjectRequest {
    @JsonProperty("team_id")
    private Long teamId;
}
