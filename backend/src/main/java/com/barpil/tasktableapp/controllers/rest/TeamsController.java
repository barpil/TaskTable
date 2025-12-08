package com.barpil.tasktableapp.controllers.rest;

import com.barpil.tasktableapp.controllers.rest.dto.*;
import com.barpil.tasktableapp.repositories.entities.Teams;
import com.barpil.tasktableapp.repositories.entities.Users;
import com.barpil.tasktableapp.security.services.JwtTokenService;
import com.barpil.tasktableapp.services.TeamsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamsController {

    private final TeamsService teamsService;
    private final JwtTokenService jwtTokenService;
    @Autowired
    public TeamsController(TeamsService teamsService, JwtTokenService jwtTokenService) {
        this.teamsService = teamsService;
        this.jwtTokenService = jwtTokenService;
    }

    @GetMapping("")
    public ResponseEntity<?> getTeamsForUser(@CookieValue(value = "jwt") String token){
        String email = jwtTokenService.getLoggedUsersEmail(token);
        GetTeamsResponse body = new GetTeamsResponse(teamsService.getTeamsByUsersEmail(email));
        return ResponseEntity.ok(body);
    }

    @PostMapping("")
    public ResponseEntity<?> createTeam(@CookieValue(value = "jwt") String token,
        @RequestBody CreateTeamRequest request){
        String email = jwtTokenService.getLoggedUsersEmail(token);
        teamsService.createTeam(email, request.getTeamName(), request.getTeamDescription());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity<?> deleteTeam(@CookieValue(value = "jwt") String token,
        @PathVariable("teamId") Long teamId){
        String userEmail = jwtTokenService.getLoggedUsersEmail(token);
        if(teamsService.deleteTeam(teamId, userEmail)){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/{teamId}/members")
    public ResponseEntity<?> getUsersInTeam(@PathVariable("teamId") Long teamId){
        return ResponseEntity.ok(new GetUsersInTeamResponse(teamsService.getUsersInTeam(teamId)));
    }

    @PostMapping("/{teamId}/members")
    public ResponseEntity<?> addUserToTeam(@PathVariable("teamId") Long teamId,
                                           @RequestBody AddUserToTeamRequest request){
        teamsService.addUserToTeam(request.getAddedUsersEmail(), teamId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{teamId}/members")
    public ResponseEntity<?> removeUserFromTeam(@PathVariable("teamId") Long teamId,
                                           @RequestBody RemoveUsersFromTeamRequest request){
        if(request.getRemovedUsersEmails() == null || request.getRemovedUsersEmails().length == 0){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        teamsService.removeUsersFromTeam(request.getRemovedUsersEmails(), teamId);
        return ResponseEntity.ok().build();
    }


}
