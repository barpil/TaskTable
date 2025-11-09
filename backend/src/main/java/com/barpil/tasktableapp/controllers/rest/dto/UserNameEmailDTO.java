package com.barpil.tasktableapp.controllers.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserNameEmailDTO{
    @JsonProperty("username")
    private String username;
    @JsonProperty("email")
    private String email;
}
