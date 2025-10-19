package com.barpil.tasktableapp.controllers.rest;

import com.barpil.tasktableapp.controllers.rest.dto.LoginRequest;
import com.barpil.tasktableapp.controllers.rest.dto.LoginResponse;
import com.barpil.tasktableapp.controllers.rest.dto.RegisterRequest;
import com.barpil.tasktableapp.controllers.rest.dto.RegisterResponse;
import com.barpil.tasktableapp.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http:localhost:4200") //Zeby dzialaly zapytania cross portowe
@RequestMapping("/api/auth")
public class AuthorizationController {

    private final UsersService usersService;

    @Autowired
    public AuthorizationController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        String email = request.getEmail();
        String password = request.getPassword();
        var status = usersService.loginUser(email, password);
        return switch(status){
            case LOGIN_SUCCESSFUL -> ResponseEntity.ok(new LoginResponse(status.name()));
            case INCORRECT_USER_CREDENTIALS -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(status.name()));
            case UNKNOWN_USER -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponse(status.name()));
            default -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        };
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request){
        String username = request.getUsername();
        String email = request.getEmail();
        String password = request.getPassword();

        var status = usersService.registerUser(username, email, password);
        return switch(status){
            case REGISTER_SUCCESSFUL -> ResponseEntity.ok(new RegisterResponse(status.name()));
            case USERNAME_ALREADY_IN_USE, EMAIL_ALREADY_IN_USE -> ResponseEntity.status(HttpStatus.CONFLICT).body(new RegisterResponse(status.name()));
            default -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        };
    }
}
