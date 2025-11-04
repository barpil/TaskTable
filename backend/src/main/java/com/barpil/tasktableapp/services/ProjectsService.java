package com.barpil.tasktableapp.services;


import com.barpil.tasktableapp.repositories.ProjectsRepository;
import com.barpil.tasktableapp.repositories.TeamsRepository;
import com.barpil.tasktableapp.repositories.entities.Projects;
import com.barpil.tasktableapp.repositories.entities.Teams;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProjectsService {

    private final TeamsRepository teamsRepository;
    private final ProjectsRepository projectsRepository;

    @Autowired
    public ProjectsService(TeamsRepository teamsRepository, ProjectsRepository projectsRepository) {
        this.teamsRepository = teamsRepository;
        this.projectsRepository = projectsRepository;
    }

    public void createProject(Long creatingTeamId, String projectName, String projectDescription){
        Teams creatingTeam = teamsRepository.findById(creatingTeamId).orElseThrow(() -> new RuntimeException("PODANY TEAM NIE ISTNIEJE"));
        Projects createdProject = Projects.createProject(projectName, projectDescription, creatingTeam);
        projectsRepository.save(createdProject);
    }

    public void deleteProject(String userEmail, Long projectId){
        projectsRepository.delete(getProjectByIdIfUserIsOwner(userEmail, projectId));
    }

    public void addTeamToProject(String userEmail, Long projectId, Long teamToAddId){
        Projects project = getProjectByIdIfUserIsOwner(userEmail, projectId);
        Teams teamToAdd = teamsRepository.findById(teamToAddId).orElseThrow(() -> new RuntimeException("PODANY TEAM NIE ISTNIEJE"));
        if(project.getParticipantTeams().contains(teamToAdd)) throw new RuntimeException("PODANY TEAM JEST JUZ DODANY DO PROJEKTU");
        project.getParticipantTeams().add(teamToAdd);
        projectsRepository.save(project);
    }

    public void removeTeamFromProject(String userEmail, Long projectId, Long teamToRemoveId){
        Projects project = getProjectByIdIfUserIsOwner(userEmail, projectId);
        Teams teamToAdd = teamsRepository.findById(teamToRemoveId).orElseThrow(() -> new RuntimeException("PODANY TEAM NIE ISTNIEJE"));
        if(!project.getParticipantTeams().contains(teamToAdd)) throw new RuntimeException("PODANY TEAM NIE BYL DODANY DO PROJEKTU");
        project.getParticipantTeams().add(teamToAdd);
        projectsRepository.save(project);
    }

    public List<Projects> getProjectsForSpecifiedTeam(Long teamId, Sort sort){
        return teamsRepository.findTeamWithProjects(teamId, sort)
                .orElseThrow(() -> new RuntimeException("PODANY TEAM NIE ISTNIEJE"))
                .getAssignedProjects().stream().toList();
    }

    public List<Projects> getProjectsForSpecifiedTeam(Long teamId){
        return getProjectsForSpecifiedTeam(teamId, Sort.by(Sort.Direction.ASC, "id"));
    }

    private Projects getProjectByIdIfUserIsOwner(String userEmail, Long projectId){
        Projects project = projectsRepository.findById(projectId).orElseThrow(() -> new RuntimeException("PROJEKT DO USUNIECIA NIE ISTNIEJE"));
        if(!project.getOwner().getEmail().equals(userEmail)) throw new RuntimeException("TYLKO WLASCICIEL MOZE USUNAC PROJEKT");
        return project;
    }
}
