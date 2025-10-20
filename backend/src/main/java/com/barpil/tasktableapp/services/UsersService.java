package com.barpil.tasktableapp.services;

import com.barpil.tasktableapp.repositories.UserRepository;
import com.barpil.tasktableapp.repositories.entities.Users;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsersService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserRegisterStatus registerUser(String username, String email, String password){
        List<Users> conflictingUsers = userRepository.checkIfUserCredentialsAlreadyExist(username, email);
        if(!conflictingUsers.isEmpty()){
            if(conflictingUsers.size()>1){
                logger.error("There might be error with database as multiple users with same username/email exist!");
                return UserRegisterStatus.UNEXPECTED_REGISTER_ERROR;
            }
            Users conflictingUser = conflictingUsers.getFirst();
            if(conflictingUser.getEmail().equals(email)){
                logger.debug("User with specified email already exists in database. Registering failed.");
                return UserRegisterStatus.EMAIL_ALREADY_IN_USE;
            }
            if(conflictingUser.getName().equals(username)) {
                logger.debug("User with specified username already exists in database. Registering failed.");
                return UserRegisterStatus.USERNAME_ALREADY_IN_USE;
            }
        }
        //Faktyczna rejestracja
        if(userRepository.registerUser(username, email,
                getHashedPassword(password))==1)
            return UserRegisterStatus.REGISTER_SUCCESSFUL;
        else{
            return UserRegisterStatus.UNEXPECTED_REGISTER_ERROR;
        }
    }

    public UserLoginStatus loginUser(String email, String password){
        Optional<Users> optUser = userRepository.getUserByEmail(email);
        if(optUser.isEmpty()) return UserLoginStatus.UNKNOWN_USER;
        if(checkUserCredentials(password, optUser.get().getHashedPassword())){
            return UserLoginStatus.LOGIN_SUCCESSFUL;
        }else{
            return UserLoginStatus.INCORRECT_USER_CREDENTIALS;
        }
    }

    public UserRemoveStatus removeUser(String login){
        if(userRepository.removeUser(login)==1){
            return UserRemoveStatus.USER_REMOVED_SUCCESSFULLY;
        }else{
            return UserRemoveStatus.UNEXPECTED_USER_REMOVE_ERROR;
        }
    }


    private String getHashedPassword(String unhashedPassword){
        return passwordEncoder.encode(unhashedPassword);
    }

    private boolean checkUserCredentials(String rawPassword, String hashedPassword){
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }


    public enum UserLoginStatus{
        UNKNOWN_USER,
        INCORRECT_USER_CREDENTIALS,
        LOGIN_SUCCESSFUL
    }

    public enum UserRegisterStatus{
        EMAIL_ALREADY_IN_USE,
        USERNAME_ALREADY_IN_USE,
        REGISTER_SUCCESSFUL,
        UNEXPECTED_REGISTER_ERROR
    }

    public enum UserRemoveStatus{
        USER_REMOVED_SUCCESSFULLY,
        UNEXPECTED_USER_REMOVE_ERROR
    }
}
