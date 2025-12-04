package com.barpil.tasktableapp.repositories;

import com.barpil.tasktableapp.repositories.entities.TeamMembers;
import com.barpil.tasktableapp.repositories.entities.Teams;
import com.barpil.tasktableapp.repositories.entities.Users;
import com.barpil.tasktableapp.repositories.entities.complexids.TeamMembersId;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamMembersRepository extends JpaRepository<TeamMembers, TeamMembersId> {

    @Query(value = "SELECT tm FROM TeamMembers tm WHERE  tm.user.email = :email")
    List<TeamMembers> getTeamsOfUserByEmail(String email, Sort sort);

    Optional<TeamMembers> getTeamMembersByUserAndTeam(Users user, Teams team);
}
