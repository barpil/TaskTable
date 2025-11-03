package com.barpil.tasktableapp.repositories;

import com.barpil.tasktableapp.repositories.entities.TaskAssignations;
import com.barpil.tasktableapp.repositories.entities.complexids.TaskAssignationsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskAssignationsRepository extends JpaRepository<TaskAssignations, TaskAssignationsId> {
}
