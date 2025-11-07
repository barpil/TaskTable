package com.barpil.tasktableapp.controllers.rest;

import com.barpil.tasktableapp.controllers.rest.dto.AssignUsersRequest;
import com.barpil.tasktableapp.repositories.entities.Tasks;
import com.barpil.tasktableapp.services.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TasksController {

    private final TaskService taskService;

    public TasksController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getTasksInProject(@PathVariable("projectId") Long projectId){
        List<Tasks> result = taskService.getTasksForProject(projectId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/assignations")
    public ResponseEntity<?> assignUsersToTask(@RequestBody AssignUsersRequest request){
        taskService.updateUsersAssignToTask(request.getTaskId(), request.getUsersToAddList());
        return ResponseEntity.ok().build();
    }
}
