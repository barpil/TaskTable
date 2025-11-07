package com.barpil.tasktableapp.repositories;

import com.barpil.tasktableapp.repositories.entities.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectsRepository extends JpaRepository<Projects, Long> {

}
