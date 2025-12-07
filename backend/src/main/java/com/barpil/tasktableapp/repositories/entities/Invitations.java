package com.barpil.tasktableapp.repositories.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Generated;
import org.hibernate.generator.EventType;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "team_invitations")
public class Invitations {

    public Invitations(Teams team) {
        this.team = team;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "invitation_code", nullable = false)
    @Generated(event = EventType.INSERT)
    private UUID invitationCode;

    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "team_id", nullable = false, unique = true)
    private Teams team;

    @Column(name = "expiration_time", nullable = false)
    @Generated(event = EventType.INSERT)
    private LocalDateTime expiration_time;



}
