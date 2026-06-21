package com.portfolio.controller;

import com.portfolio.entity.Skill;
import com.portfolio.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> add(@PathVariable Long userId, @Valid @RequestBody Skill skill) {
        try {
            return ResponseEntity.ok(skillService.add(userId, skill));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(skillService.getByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Skill skill) {
        try {
            return ResponseEntity.ok(skillService.update(id, skill));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        skillService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
    }
}
