package com.portfolio.service;

import com.portfolio.dto.PortfolioResponse;
import com.portfolio.repository.*;
import org.springframework.stereotype.Service;

@Service
public class PortfolioService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final CertificationRepository certificationRepository;
    private final SocialLinkRepository socialLinkRepository;

    public PortfolioService(UserRepository ur, ProjectRepository pr, SkillRepository sr,
                            CertificationRepository cr, SocialLinkRepository slr) {
        this.userRepository = ur;
        this.projectRepository = pr;
        this.skillRepository = sr;
        this.certificationRepository = cr;
        this.socialLinkRepository = slr;
    }

    public PortfolioResponse getPortfolio(Long userId) {
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var resp = new PortfolioResponse();
        resp.setUser(new com.portfolio.dto.UserResponse(user.getId(), user.getName(), user.getEmail(), user.getResumePath()));
        resp.setProjects(projectRepository.findByUserId(userId));
        resp.setSkills(skillRepository.findByUserId(userId));
        resp.setCertifications(certificationRepository.findByUserId(userId));
        resp.setSocialLinks(socialLinkRepository.findByUserId(userId));
        return resp;
    }
}
