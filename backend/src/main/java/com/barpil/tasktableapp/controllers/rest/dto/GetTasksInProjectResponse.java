package com.barpil.tasktableapp.controllers.rest.dto;

import com.barpil.tasktableapp.repositories.entities.Tasks;
import com.barpil.tasktableapp.repositories.entities.Users;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class GetTasksInProjectResponse {
    List<TaskAndAssignedUsersDTO> tasks;


    public GetTasksInProjectResponse(List<Tasks> tasks) {
        this.tasks = tasks.stream().map(TaskAndAssignedUsersDTO::new)
                .toList();
    }

    @Data
    static class TaskAndAssignedUsersDTO{
        private Long id;
        private String name;
        private String description;
        private Tasks.TaskState state;
        @JsonProperty("assigned_users")
        private List<UserNameEmailDTO> assignedUsers;

        public TaskAndAssignedUsersDTO(Tasks task) {
            this.id = task.getId();
            this.name = task.getName();
            this.description = task.getDescription();
            this.state = task.getState();
            this.assignedUsers = task.getAssignedUsers().stream()
                    .map(assignation -> new UserNameEmailDTO(assignation.getUser().getName(), assignation.getUser().getEmail())).toList();
        }
    }
}
