package com.barpil.tasktableapp.repositories;

import com.barpil.tasktableapp.repositories.entities.Projects;
import com.barpil.tasktableapp.repositories.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectsRepository extends JpaRepository<Projects, Long> {
    @Query("""
        SELECT DISTINCT u
        FROM Users u
        JOIN u.memberships m
        JOIN m.team t
        JOIN t.assignedProjects p
        WHERE p.id = :projectId
        """)
    List<Users> getUsersInProject(Long projectId);
}
