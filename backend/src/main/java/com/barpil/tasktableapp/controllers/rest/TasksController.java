package com.barpil.tasktableapp.controllers.rest;

import com.barpil.tasktableapp.controllers.rest.dto.*;
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
        return ResponseEntity.ok(new GetTasksInProjectResponse(result));
    }

    @PostMapping("/{projectId}")
    public ResponseEntity<?> createNewTaskInProject(@PathVariable("projectId") Long projectId,
                                                    @RequestBody CreateTaskRequest request){
        taskService.createTask(projectId, request.getTaskName(), request.getDescription());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable("taskId") Long taskId){
        taskService.removeTask(taskId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable("taskId") Long taskId,
                                        @RequestBody UpdateTaskRequest request){
        taskService.updateTask(taskId, request.getTaskName(), request.getDescription());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{taskId}/state")
    public ResponseEntity<?> updateTaskState(@PathVariable("taskId") Long taskId,
                                             @RequestBody UpdateTaskStateRequest request){
        taskService.changeTaskState(taskId, request.getState());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{taskId}/assignations")
    public ResponseEntity<?> updateAssignedUsers(@PathVariable("taskId") Long taskId, @RequestBody AssignUsersRequest request){
        taskService.updateUsersAssignToTask(taskId, request.getUsersToAddList());
        return ResponseEntity.ok().build();
    }

}
