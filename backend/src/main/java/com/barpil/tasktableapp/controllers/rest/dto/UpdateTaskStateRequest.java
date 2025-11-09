package com.barpil.tasktableapp.controllers.rest.dto;

import com.barpil.tasktableapp.repositories.entities.Tasks;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UpdateTaskStateRequest {
    @JsonProperty("state")
    private Tasks.TaskState state;
}
