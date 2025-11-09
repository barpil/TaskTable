package com.barpil.tasktableapp.controllers.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AddUserToTeamRequest {
    @JsonProperty("user_email")
    private String addedUsersEmail;
}
