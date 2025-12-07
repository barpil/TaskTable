package com.barpil.tasktableapp.controllers.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateInvitationResponse {


    public CreateInvitationResponse(String invitationCode) {
        this.invitationCode = invitationCode;
    }

    @JsonProperty("invitation_code")
    private String invitationCode;
}
