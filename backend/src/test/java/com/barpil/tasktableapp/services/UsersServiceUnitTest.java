package com.barpil.tasktableapp.services;


import com.barpil.tasktableapp.repositories.UserRepository;
import com.barpil.tasktableapp.repositories.entities.Users;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

//Testy do naprawy

@ExtendWith(MockitoExtension.class)
@Disabled
class UsersServiceUnitTest {
    Logger logger = LoggerFactory.getLogger(UsersServiceUnitTest.class);


    @Mock
    UserRepository userRepository;
    @InjectMocks
    UsersService usersService;

    @Test
    void registerUser_ShouldReturnUnexpectedErrorEnum_WhenThereAreMoreThanOneConflictingUser(){
        // given
        String username = "testUser";
        String email = "testMail@email.com";
        List<Users> returnedUserList = List.of(new Users(1L, username, email, "password1", Set.of(), Set.of()),
                new Users(2L, username, email, "password2", Set.of(), Set.of()));
        when(userRepository.checkIfUserCredentialsAlreadyExist(username, email)).thenReturn(returnedUserList);
        // when
        var resultStatus = usersService.registerUser(username, email, "password");
        // then
        assertEquals(UsersService.UserRegisterStatus.UNEXPECTED_REGISTER_ERROR, resultStatus);
    }

    @Test
    void registerUser_ShouldReturnEmailAlreadyInUseEnum_WhenConflictingEmailWithAnotherUser(){
        // given
        String username = "testUser";
        String email = "testMail@email.com";
        List<Users> returnedUserList = List.of(new Users(1L, "otherUser", email, "password1", Set.of(), Set.of()));
        when(userRepository.checkIfUserCredentialsAlreadyExist(username, email)).thenReturn(returnedUserList);
        // when
        var resultStatus = usersService.registerUser(username, email, "password");
        // then
        assertEquals(UsersService.UserRegisterStatus.EMAIL_ALREADY_IN_USE, resultStatus);
    }

    @Test
    void registerUser_ShouldReturnUsernameAlreadyInUseEnum_WhenConflictingUsernameWithAnotherUser(){
        // given
        String username = "testUser";
        String email = "testMail@email.com";
        List<Users> returnedUserList = List.of(new Users(1L, username, "otherEmail@email.com", "password1", Set.of(), Set.of()));
        when(userRepository.checkIfUserCredentialsAlreadyExist(username, email)).thenReturn(returnedUserList);
        // when
        var resultStatus = usersService.registerUser(username, email, "password");
        // then
        assertEquals(UsersService.UserRegisterStatus.USERNAME_ALREADY_IN_USE, resultStatus);
    }

    @Test
    void registerUser_ShouldReturnUnexpectedRegisterErrorEnum_WhenUserRepositoryFailedToRegisterUser(){
        // given
        String username = "testUser";
        String email = "testMail@email.com";
        when(userRepository.checkIfUserCredentialsAlreadyExist(username, email)).thenReturn(Collections.emptyList());
        when(userRepository.registerUser(eq(username), eq(email), anyString())).thenReturn(0);
        // when
        var resultStatus = usersService.registerUser(username, email, "password");
        // then
        assertEquals(UsersService.UserRegisterStatus.UNEXPECTED_REGISTER_ERROR, resultStatus);
    }

    @Test
    void loginUser_ShouldReturnUnknownUserEnum_WhenGivenLoginIsUnknown(){
        // given
        String username = "testUser";
        String email = "testMail@email.com";
        String password = "password";
        when(userRepository.getUserByEmail(email)).thenReturn(Optional.empty());
        // when
        var resultStatus = usersService.loginUser(email, password);
        // then
        assertEquals(UsersService.UserLoginStatus.UNKNOWN_USER, resultStatus);
    }

    @Test
    void loginUser_ShouldReturnIncorrectCredentialsEnum_WhenGivenPasswordIsIncorrect(){
        // given
        String username = "testUser";
        String email = "testMail@email.com";
        String password = "password";
        String hashedPassword = "";
        try{
            Method passwordHashingMethod = usersService.getClass().getDeclaredMethod("getHashedPassword", String.class);
            passwordHashingMethod.setAccessible(true);
            hashedPassword = (String) passwordHashingMethod.invoke(usersService, password);
        }catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
            logger.error("Could not get passwordHashingMethod with reflection, needed to fulfill test. Exception: {}", e.toString());
            fail();
        }
        when(userRepository.getUserByEmail(email)).thenReturn(Optional.of(new Users(1L, username, email, hashedPassword, Set.of(), Set.of())));
        // when
        var resultStatus = usersService.loginUser(email, "incorrectPassword");
        // then
        assertEquals(UsersService.UserLoginStatus.INCORRECT_USER_CREDENTIALS, resultStatus);
    }

    @Test
    void loginUser_ShouldReturnLoginSuccessfulEnum_WhenGivenPasswordIsCorrect(){
        // given
        String username = "testUser";
        String email = "testMail@email.com";
        String password = "password";
        String hashedPassword = "";
        try{
            Method passwordHashingMethod = usersService.getClass().getDeclaredMethod("getHashedPassword", String.class);
            passwordHashingMethod.setAccessible(true);
            hashedPassword = (String) passwordHashingMethod.invoke(usersService, password);
        }catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
            logger.error("Could not get passwordHashingMethod with reflection, needed to fulfill test. Exception: {}", e.toString());
            fail();
        }
        when(userRepository.getUserByEmail(email)).thenReturn(Optional.of(new Users(1L, username, email, hashedPassword, Set.of(), Set.of())));
        // when
        var resultStatus = usersService.loginUser(email, password);
        // then
        assertEquals(UsersService.UserLoginStatus.LOGIN_SUCCESSFUL, resultStatus);
    }

}
