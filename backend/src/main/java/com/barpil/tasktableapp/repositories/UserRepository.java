package com.barpil.tasktableapp.repositories;

import com.barpil.tasktableapp.repositories.entities.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    @Query("""
        SELECT u
            FROM Users u
            WHERE u.email = :email OR u.name = :username
        """)
    List<Users> checkIfUserCredentialsAlreadyExist(String username, String email);

    @Query("""
    SELECT u
        FROM Users u
        WHERE u.email = :email
    """)
    Optional<Users> getUserByEmail(String email);

    @Query("""
    SELECT u FROM Users u WHERE u.email IN (:emailList)
    """)
    List<Users> getUsersByEmail(List<String> emailList);

    @Modifying
    @Transactional
    @Query(value = """
                 INSERT INTO Users
                     (username, email, password)
                     VALUES (:username, :email, :hashedPassword)
            """, nativeQuery = true)
    int registerUser(String username, String email, String hashedPassword);

    @Modifying
    @Transactional
    @Query(value = """
        DELETE FROM Users
            WHERE email = :email
    """, nativeQuery = true)
    int removeUser(String email);

    List<Users> findByName(String username);

}
