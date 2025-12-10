package com.barpil.tasktableapp.repositories;

import com.barpil.tasktableapp.repositories.entities.Invitations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface InvitationsRepository extends JpaRepository<Invitations, Long> {

    Optional<Invitations> findInvitationsByInvitationCode(UUID invitationCode);

    @Modifying
    @Query(value = "DELETE FROM team_invitations ti WHERE ti.expiration_time< NOW();", nativeQuery = true)
    void deleteExpiredInvitations();

    boolean existsByTeam_Id(long teamId);

    Optional<Invitations> findByTeam_Id(long teamId);
}
