package com.barpil.tasktableapp.controllers.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class AssignUsersRequest {
    @JsonProperty("task_id")
    private Long taskId;
    @JsonProperty("email_list")
    private List<String> usersToAddList;
}
