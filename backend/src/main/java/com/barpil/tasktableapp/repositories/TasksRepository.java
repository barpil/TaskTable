package com.barpil.tasktableapp.repositories;

import com.barpil.tasktableapp.repositories.entities.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Long> {

    @Query("""
    SELECT t FROM Tasks t WHERE t.project.id = :projectId
    """)
    List<Tasks> getTasksInProject(Long projectId);
}
