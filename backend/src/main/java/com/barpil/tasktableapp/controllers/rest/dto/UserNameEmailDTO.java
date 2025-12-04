package com.barpil.tasktableapp.controllers.rest.dto;

import com.barpil.tasktableapp.repositories.entities.Users;
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

    public UserNameEmailDTO(Users user) {
        this.username = user.getName();
        this.email = user.getEmail();
    }
}
