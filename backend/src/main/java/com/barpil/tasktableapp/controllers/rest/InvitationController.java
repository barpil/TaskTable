package com.barpil.tasktableapp.controllers.rest;

import com.barpil.tasktableapp.controllers.rest.dto.CreateInvitationRequest;
import com.barpil.tasktableapp.controllers.rest.dto.CreateInvitationResponse;
import com.barpil.tasktableapp.repositories.entities.Teams;
import com.barpil.tasktableapp.security.services.JwtTokenService;
import com.barpil.tasktableapp.services.InvitationsService;
import com.barpil.tasktableapp.services.TeamsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/invite")
public class InvitationController {
    private final JwtTokenService jwtTokenService;
    private final TeamsService teamsService;
    private final InvitationsService invitationsService;

    public InvitationController(JwtTokenService jwtTokenService, TeamsService teamsService, InvitationsService invitationsService) {
        this.jwtTokenService = jwtTokenService;
        this.teamsService = teamsService;
        this.invitationsService = invitationsService;
    }

    @PostMapping("")
    public ResponseEntity<?> createInvitation(@RequestBody CreateInvitationRequest request,
                                              @CookieValue(name = "jwt") String token){
        String invitorEmail = jwtTokenService.getLoggedUsersEmail(token);
        Optional<Teams> team = teamsService.getTeam(request.getTeamId());
        if(team.isPresent() && team.get().getOwner().getEmail().equals(invitorEmail)){
            return ResponseEntity.ok(new CreateInvitationResponse(invitationsService.createInvitation(team.get().getId()).getInvitationCode().toString()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/{inviteCode}")
    public ResponseEntity<?> resolveTeamInvitation(@PathVariable("inviteCode") String inviteCode,
                                                   @CookieValue(value = "jwt") String token){
        String invitedUserEmail = jwtTokenService.getLoggedUsersEmail(token);
        long resolvedTeamId = invitationsService.resolveInvitation(inviteCode, invitedUserEmail);
        if(resolvedTeamId>0){
            return ResponseEntity.ok(resolvedTeamId);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

}
