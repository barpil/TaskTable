package com.barpil.tasktableapp.services;

import com.barpil.tasktableapp.repositories.UserRepository;
import com.barpil.tasktableapp.repositories.entities.Users;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Disabled

//Testy do naprawy/ napisania od nowa bo sie duzo zmienilo
class UsersServiceIntegrationTest {

    Logger logger = LoggerFactory.getLogger(UsersServiceIntegrationTest.class);

    static DockerImageName ttapostgresImage = DockerImageName.parse("ttappostgres");
    @Container
    static GenericContainer<?> postgres = new GenericContainer<>(ttapostgresImage)
            .withExposedPorts(5432)
            .withEnv("POSTGRES_USER", "user")
            .withEnv("POSTGRES_PASSWORD", "password")
            .withEnv("POSTGRES_DB", "tasktablemtab");

    @DynamicPropertySource
    static void registerProperties(DynamicPropertyRegistry registry) {
        String url = String.format("jdbc:postgresql://%s:%d/%s",
                postgres.getHost(),
                postgres.getMappedPort(5432),
                "tasktablemtab");

        registry.add("spring.datasource.url", () -> url);
        registry.add("spring.datasource.username", () -> "user");
        registry.add("spring.datasource.password", () -> "password");
    }

    @Autowired
    UserRepository userRepository;
    @Autowired
    UsersService usersService;


    @BeforeEach
    void setUp() {
    }

    @Test
    void isDatabaseTestContainerWorking() {
        assertThat(postgres.isCreated()).isTrue();
        assertThat(postgres.isRunning()).isTrue();
    }

    @Test
    void registerUser_ShouldRegisterUserCorrectly_WhenNoConflictingUsersExist() {
        // given
        String username = "testUser";
        String email = "testMail@email.com";
        String password = "password";

        // when
        var resultStatus = usersService.registerUser(username, email, password);
        // then
        assertEquals(UsersService.UserRegisterStatus.REGISTER_SUCCESSFUL, resultStatus);
        Optional<Users> optRegisteredUser = userRepository.getUserByEmail(email);
        assertThat(optRegisteredUser.isEmpty()).isFalse();
        Users registeredUser = optRegisteredUser.get();
        assertAll(
                () -> assertEquals(username, registeredUser.getName()),
                () -> assertEquals(email, registeredUser.getEmail()),
                () -> assertThat(isPasswordCorrect(password, registeredUser.getHashedPassword())).isTrue()
        );
    }

    @Test
    void loginUser_ShouldLoginUserCorrectly_WhenGivenCredentialsAreCorrect() {
        // given
        String username = "testUser";
        String email = "testMail@email.com";
        String password = "password";
        usersService.registerUser(username, email, password);
        // when
        var resultStatus = usersService.loginUser(email, password);
        // then
        assertEquals(UsersService.UserLoginStatus.LOGIN_SUCCESSFUL, resultStatus);
    }




    private boolean isPasswordCorrect(String rawPassword, String hashedPassword){
        try {
            Method checkCredentialsMethod = usersService.getClass().getDeclaredMethod("checkUserCredentials", String.class, String.class);
            checkCredentialsMethod.setAccessible(true);
            return (boolean) checkCredentialsMethod.invoke(usersService, rawPassword, hashedPassword);
        } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
            logger.error("Could not get passwordHashingMethod with reflection, needed to fulfill test. Exception: {}", e.toString());
            return false;
        }
    }
}