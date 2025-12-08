package com.barpil.tasktableapp.services;

import com.barpil.tasktableapp.repositories.InvitationsRepository;
import com.barpil.tasktableapp.repositories.entities.Invitations;
import com.barpil.tasktableapp.repositories.entities.Teams;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class InvitationsService {

    private final InvitationsRepository invitationsRepository;
    private final TeamsService teamsService;


    @Autowired
    public InvitationsService(InvitationsRepository invitationsRepository, TeamsService teamsService) {
        this.invitationsRepository = invitationsRepository;
        this.teamsService = teamsService;
    }

    public Invitations createInvitation(Long teamId){
        return createInvitation(teamId, false);
    }

    public Invitations createInvitation(Long teamId, boolean replaceOldInvitation){
        Teams team = teamsService.getTeam(teamId).orElseThrow(() -> new RuntimeException("SPECIFIED TEAM DOES NOT EXIST"));
        Optional<Invitations> existingInvitation = this.invitationsRepository.findByTeam_Id(teamId);
        if(replaceOldInvitation && existingInvitation.isPresent()){
            invitationsRepository.delete(existingInvitation.get());
            return invitationsRepository.save(new Invitations(team));
        }
        return existingInvitation.orElseGet(() -> invitationsRepository.save(new Invitations(team)));
    }

    public long resolveInvitation(String invitationCode, String userEmail){
        try{
            Invitations invitation = invitationsRepository.findInvitationsByInvitationCode(UUID.fromString(invitationCode))
                    .orElseThrow(() -> new RuntimeException("INVITATION NOT FOUND"));
            teamsService.addUserToTeam(userEmail, invitation.getTeam().getId());
            return invitation.getTeam().getId();
        }catch (Exception e){
            return -1;
        }
    }

    @Scheduled(fixedRate = 3600000)
    @Transactional
    public void cleanupInvitations() {
        invitationsRepository.deleteExpiredInvitations();
    }
}
