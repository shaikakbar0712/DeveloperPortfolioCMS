package com.portfolio.service;

import com.portfolio.entity.Certification;
import com.portfolio.entity.User;
import com.portfolio.repository.CertificationRepository;
import com.portfolio.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificationService {

    private final CertificationRepository certificationRepository;
    private final UserRepository userRepository;

    public CertificationService(CertificationRepository certificationRepository, UserRepository userRepository) {
        this.certificationRepository = certificationRepository;
        this.userRepository = userRepository;
    }

    public Certification add(Long userId, Certification cert) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        cert.setUser(user);
        return certificationRepository.save(cert);
    }

    public List<Certification> getByUser(Long userId) {
        return certificationRepository.findByUserId(userId);
    }

    public Certification update(Long id, Certification updated) {
        Certification c = certificationRepository.findById(id).orElseThrow(() -> new RuntimeException("Certification not found"));
        c.setCertificateName(updated.getCertificateName());
        c.setIssuer(updated.getIssuer());
        return certificationRepository.save(c);
    }

    public void delete(Long id) {
        certificationRepository.deleteById(id);
    }
}
