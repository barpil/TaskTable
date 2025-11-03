package com.barpil.tasktableapp.repositories;

import com.barpil.tasktableapp.repositories.entities.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Long> {
}
