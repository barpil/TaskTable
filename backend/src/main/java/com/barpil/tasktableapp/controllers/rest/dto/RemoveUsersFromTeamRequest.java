package com.barpil.tasktableapp.controllers.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RemoveUsersFromTeamRequest {
    @JsonProperty("user_emails")
    private String[] removedUsersEmails;
}
