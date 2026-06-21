package com.portfolio.controller;

import com.portfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getPortfolio(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(portfolioService.getPortfolio(userId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
