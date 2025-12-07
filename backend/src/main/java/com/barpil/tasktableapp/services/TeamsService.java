package com.barpil.tasktableapp.services;

import com.barpil.tasktableapp.repositories.TeamMembersRepository;
import com.barpil.tasktableapp.repositories.TeamsRepository;
import com.barpil.tasktableapp.repositories.UserRepository;
import com.barpil.tasktableapp.repositories.entities.TeamMembers;
import com.barpil.tasktableapp.repositories.entities.Teams;
import com.barpil.tasktableapp.repositories.entities.Users;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class TeamsService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final TeamMembersRepository teamMembersRepository;
    private final TeamsRepository teamsRepository;
    private final UserRepository userRepository;

    @Autowired
    public TeamsService(TeamMembersRepository teamMembersRepository, TeamsRepository teamsRepository, UserRepository userRepository) {
        this.teamMembersRepository = teamMembersRepository;
        this.teamsRepository = teamsRepository;
        this.userRepository = userRepository;
    }

    public List<TeamMembers> getTeamsByUsersEmail(String email){
        Sort defaultSort = Sort.by(Sort.Direction.ASC, "team.name");
        return getTeamsByUsersEmail(email, defaultSort);
    }

    public List<TeamMembers> getTeamsByUsersEmail(String email, Sort sort){
        return teamMembersRepository.getTeamsOfUserByEmail(email, sort);
    }

    public List<Users> getUsersInTeam(Long teamId){
        return teamsRepository.findById(teamId).orElseThrow(() -> new RuntimeException("PODANY TEAM NIE ISTNIEJE")).getMembers()
                .stream().map(TeamMembers::getUser).toList();
    }

    public void createTeam(String creatorsEmail, String teamsName, String teamsDescription){
        Users teamOwner = getUserByEmail(creatorsEmail);
        Teams createdTeam = Teams.createTeam(teamOwner, teamsName, teamsDescription);
        teamsRepository.save(createdTeam);
    }

    public void removeUserFromTeam(String removedUsersEmail, Long teamId){
        Teams team = teamsRepository.findById(teamId).orElseThrow(() -> new RuntimeException("PODANY TEAM NIE ISTNIEJE"));
        Users removedUser = getUserByEmail(removedUsersEmail);
        if(team.getMembers().size()<=1){
            teamsRepository.delete(team);
            return;
        }
        teamMembersRepository.getTeamMembersByUserAndTeam(removedUser, team)
                        .ifPresentOrElse(
                                teamMembersRepository::delete,
                                () -> logger.error("User ({}:{}) is not a part of specified team ({}:{}).",
                                            removedUser.getName(), removedUsersEmail, team.getId(), team.getName())
                        );
    }

    public void addUserToTeam(String addedUsersEmail, Long teamId){
        Teams team = teamsRepository.findById(teamId).orElseThrow(() -> new RuntimeException("PODANY TEAM NIE ISTNIEJE"));
        Users addedUser = getUserByEmail(addedUsersEmail);
        teamMembersRepository.getTeamMembersByUserAndTeam(addedUser, team)
                .ifPresentOrElse(
                        teamMember -> logger.error("User ({}:{}) is already a part of specified team ({}:{}).",
                                addedUser.getName(), addedUsersEmail, team.getId(), team.getName()),
                        () -> teamMembersRepository.save(new TeamMembers(addedUser, team))
                );
    }

    private Users getUserByEmail(String email){
        return userRepository.getUserByEmail(email).orElseThrow(() -> new RuntimeException("USER NIE ISTNIEJE"));
    }

    public boolean deleteTeam(Long teamId, String userEmail){
        Teams team = teamsRepository.findById(teamId).orElseThrow(() -> new RuntimeException("PODANY TEAM NIE ISTNIEJE"));
        if(team.getOwner().getEmail().equals(userEmail)){
            teamsRepository.deleteById(teamId);
            return true;
        }
        return false;
    }

    public Optional<Teams> getTeam(Long teamId){
        return teamsRepository.findById(teamId);
    }





}
