package com.example.integradeproject.services;

import com.example.integradeproject.user_account.User;
import com.example.integradeproject.user_account.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class UserService {
    @Autowired

    private final UserRepository userRepository;

//    public User getCurrentUser() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        Object principal = authentication.getPrincipal();
//        if (principal instanceof UserDetails userDetails) {
//            return userRepository.findByUsername(userDetails.getUsername())
//                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//        }
//        return null;
//    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
