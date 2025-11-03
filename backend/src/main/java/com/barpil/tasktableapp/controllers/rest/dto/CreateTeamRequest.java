package com.barpil.tasktableapp.controllers.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CreateTeamRequest {
    @JsonProperty("team_name")
    private String teamName;
    @JsonProperty("description")
    private String teamDescription;
}
