package com.barpil.tasktableapp.controllers.rest.dto;

import com.barpil.tasktableapp.repositories.entities.Users;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class GetUsersInTeamResponse {
    @JsonProperty("users")
    private List<UserNameEmailDTO> userDTOList;


    public GetUsersInTeamResponse(List<Users> userList) {
        this.userDTOList = userList.stream()
                .map(user -> new UserNameEmailDTO(user.getName(), user.getEmail())).toList();
    }


}

