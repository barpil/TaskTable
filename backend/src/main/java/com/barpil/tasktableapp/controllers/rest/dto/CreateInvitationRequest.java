package com.barpil.tasktableapp.controllers.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CreateInvitationRequest {
    @JsonProperty("team_id")
    private Long teamId;
}
