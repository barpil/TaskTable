package com.barpil.tasktableapp.controllers.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UpdateTaskRequest {
    @JsonProperty("task_name")
    private String taskName;
    @JsonProperty("description")
    private String description;
}
