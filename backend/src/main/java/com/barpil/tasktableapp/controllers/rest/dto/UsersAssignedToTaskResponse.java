package com.barpil.tasktableapp.controllers.rest.dto;

import com.barpil.tasktableapp.repositories.entities.Users;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class UsersAssignedToTaskResponse {
    @JsonProperty("users")
    private List<UserNameEmailDTO> users;

    public UsersAssignedToTaskResponse(List<Users> users) {
        this.users = users.stream()
                .map(user -> new UserNameEmailDTO(user.getName(), user.getEmail())).toList();
    }
}
