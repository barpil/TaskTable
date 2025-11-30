package com.barpil.tasktableapp.controllers.rest;

import com.barpil.tasktableapp.controllers.rest.dto.LoginRequest;
import com.barpil.tasktableapp.controllers.rest.dto.LoginResponse;
import com.barpil.tasktableapp.controllers.rest.dto.RegisterRequest;
import com.barpil.tasktableapp.controllers.rest.dto.RegisterResponse;
import com.barpil.tasktableapp.security.services.JwtTokenService;
import com.barpil.tasktableapp.services.ProjectsService;
import com.barpil.tasktableapp.services.TeamsService;
import com.barpil.tasktableapp.services.UsersService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http:localhost:4200") //Zeby dzialaly zapytania cross portowe
@RequestMapping("/api/auth")
public class AuthorizationController {

    private final UsersService usersService;
    private final TeamsService teamsService;
    private final ProjectsService projectsService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;

    @Autowired
    public AuthorizationController(UsersService usersService, TeamsService teamsService, ProjectsService projectsService, AuthenticationManager authenticationManager, JwtTokenService jwtTokenService) {
        this.usersService = usersService;
        this.teamsService = teamsService;
        this.projectsService = projectsService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletResponse servletResponse){

        authenticationManager.authenticate( //Jak sie nie uda to wywala odpowiednie bledy i zwraca odpowiednie HttpStatusy
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = jwtTokenService.generateToken(request.getEmail());

        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); //Bo nie uzywam https JESZCZE
        cookie.setPath("/api"); //Tylko sciezki od tego sie zaczynajace beda otrzymywac to ciasteczko
        cookie.setMaxAge(3600);
        servletResponse.addCookie(cookie);

        return ResponseEntity.ok(new LoginResponse(UsersService.UserLoginStatus.LOGIN_SUCCESSFUL.name()));
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/api");
        cookie.setMaxAge(0); // Usuwam tutaj ciasteczko
        response.addCookie(cookie);
        return ResponseEntity.ok(Map.of("message", "User logged out."));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validate(@CookieValue(value = "jwt", required = false) String token) {
        if (isTokenValid(token)) {
            return ResponseEntity.ok(Map.of("authenticated", true));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
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

    @GetMapping("/whoami")
    public ResponseEntity<?> getLoggedUsername(@CookieValue(value = "jwt") String token){
        if(isTokenValid(token)){
            Map<String, String> userInfoMap = usersService.getUserInformation(jwtTokenService.getLoggedUsersEmail(token));
            return userInfoMap.isEmpty() ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(userInfoMap);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    private boolean isTokenValid(String token){
        return (token != null && jwtTokenService.validateToken(token));
    }

    @GetMapping("/access/team/{teamId}")
    public ResponseEntity<?> checkTeamAccess(@CookieValue(value = "jwt") String token, @PathVariable("teamId") Long teamId) {
        if(!isTokenValid(token)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        String userEmail = this.jwtTokenService.getLoggedUsersEmail(token);
        if(teamsService.getUsersInTeam(teamId).stream().anyMatch(user -> user.getEmail().equals(userEmail))){
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/access/project/{projectId}")
    public ResponseEntity<?> checkProjectAccess(@CookieValue(value = "jwt") String token, @PathVariable("projectId") Long projectId) {
        if(!isTokenValid(token)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        String userEmail = this.jwtTokenService.getLoggedUsersEmail(token);
        if(projectsService.getUsersInProject(projectId).stream().anyMatch(user -> user.getEmail().equals(userEmail))){
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
