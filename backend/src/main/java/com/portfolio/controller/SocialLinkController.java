package com.portfolio.controller;

import com.portfolio.entity.SocialLink;
import com.portfolio.service.SocialLinkService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/social-links")
public class SocialLinkController {

    private final SocialLinkService socialLinkService;

    public SocialLinkController(SocialLinkService socialLinkService) {
        this.socialLinkService = socialLinkService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> add(@PathVariable Long userId, @Valid @RequestBody SocialLink link) {
        try {
            return ResponseEntity.ok(socialLinkService.add(userId, link));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(socialLinkService.getByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody SocialLink link) {
        try {
            return ResponseEntity.ok(socialLinkService.update(id, link));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        socialLinkService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
    }
}
