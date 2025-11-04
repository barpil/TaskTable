package com.barpil.tasktableapp.repositories;

import com.barpil.tasktableapp.repositories.entities.Teams;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamsRepository extends JpaRepository<Teams, Long> {
    @Query("SELECT t FROM Teams t LEFT JOIN FETCH t.assignedProjects WHERE t.id = :teamId")
    Optional<Teams> findTeamWithProjects(Long teamId, Sort sort);
}
