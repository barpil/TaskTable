package com.barpil.tasktableapp.repositories.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    @JsonIgnore
    private String hashedPassword;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<TeamMembers> memberships = new HashSet<>();
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<TaskAssignations> assignedTasks = new HashSet<>();


}
