package com.barpil.tasktableapp.security.services;

import com.barpil.tasktableapp.repositories.UserRepository;
import com.barpil.tasktableapp.repositories.entities.Users;
import com.barpil.tasktableapp.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = userRepository.getUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No user found for email: "+email));
        return new User(user.getEmail(), user.getHashedPassword(), List.of());
    }
}
