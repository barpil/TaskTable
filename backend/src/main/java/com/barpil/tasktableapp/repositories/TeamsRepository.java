package com.barpil.tasktableapp.repositories;

import com.barpil.tasktableapp.repositories.entities.Teams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamsRepository extends JpaRepository<Teams, Long> {
}
