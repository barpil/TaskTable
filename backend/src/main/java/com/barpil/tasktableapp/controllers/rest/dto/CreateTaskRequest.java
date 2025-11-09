package com.barpil.tasktableapp.controllers.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CreateTaskRequest {
    @JsonProperty("task_name")
    private String taskName;
    @JsonProperty("description")
    private String description;
}
