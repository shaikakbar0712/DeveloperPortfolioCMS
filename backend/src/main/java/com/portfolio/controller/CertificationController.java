package com.portfolio.controller;

import com.portfolio.entity.Certification;
import com.portfolio.service.CertificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    private final CertificationService certificationService;

    public CertificationController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> add(@PathVariable Long userId, @Valid @RequestBody Certification cert) {
        try {
            return ResponseEntity.ok(certificationService.add(userId, cert));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(certificationService.getByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Certification cert) {
        try {
            return ResponseEntity.ok(certificationService.update(id, cert));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        certificationService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
    }
}
