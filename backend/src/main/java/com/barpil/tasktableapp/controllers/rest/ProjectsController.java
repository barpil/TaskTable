package com.barpil.tasktableapp.controllers.rest;

import com.barpil.tasktableapp.controllers.rest.dto.AddTeamToProjectRequest;
import com.barpil.tasktableapp.controllers.rest.dto.CreateProjectRequest;
import com.barpil.tasktableapp.security.services.JwtTokenService;
import com.barpil.tasktableapp.services.ProjectsService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
public class ProjectsController {

    private final ProjectsService projectsService;
    private final JwtTokenService jwtTokenService;

    @Autowired
    public ProjectsController(ProjectsService projectsService, JwtTokenService jwtTokenService) {
        this.projectsService = projectsService;
        this.jwtTokenService = jwtTokenService;
    }

    @GetMapping("/{team_id}")
    public ResponseEntity<?> getProjectsForTeam(@PathVariable("team_id") Long teamId){
        return ResponseEntity.ok(projectsService.getProjectsForSpecifiedTeam(teamId));
    }

    @PostMapping("")
    public ResponseEntity<?> createProjectForTeam(@RequestBody CreateProjectRequest request){
        projectsService.createProject(request.getTeamId(), request.getProjectName(), request.getProjectDescription());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{project_id}")
    public ResponseEntity<?> addTeamToProject(@CookieValue(name = "jwt") String token, @PathVariable("project_id") Long projectId,
                                              @RequestBody AddTeamToProjectRequest request){
        projectsService.addTeamToProject(jwtTokenService.getLoggedUsersEmail(token), projectId, request.getTeamId());
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{project_id}")
    public ResponseEntity<?> deleteProject(@CookieValue(name = "jwt") String token, @PathVariable("project_id") Long projectId){
        projectsService.deleteProject(jwtTokenService.getLoggedUsersEmail(token), projectId);
        return ResponseEntity.ok().build();
    }


}
