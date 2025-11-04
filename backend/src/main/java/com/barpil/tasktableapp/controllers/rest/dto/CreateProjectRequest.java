package com.barpil.tasktableapp.controllers.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateProjectRequest {
    @JsonProperty("team_id")
    private Long teamId;
    @JsonProperty("project_name")
    private String projectName;
    @JsonProperty("description")
    private String projectDescription;
}
