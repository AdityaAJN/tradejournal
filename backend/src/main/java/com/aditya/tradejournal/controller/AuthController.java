package com.aditya.tradejournal.controller;

import com.aditya.tradejournal.dto.RegisterRequest;
import com.aditya.tradejournal.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }
    @PostMapping("/login")
public String login(@RequestBody com.aditya.tradejournal.dto.LoginRequest request) {
    return authService.login(request);
}
}