package com.portfolio.service;

import com.portfolio.entity.SocialLink;
import com.portfolio.entity.User;
import com.portfolio.repository.SocialLinkRepository;
import com.portfolio.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SocialLinkService {

    private final SocialLinkRepository socialLinkRepository;
    private final UserRepository userRepository;

    public SocialLinkService(SocialLinkRepository socialLinkRepository, UserRepository userRepository) {
        this.socialLinkRepository = socialLinkRepository;
        this.userRepository = userRepository;
    }

    public SocialLink add(Long userId, SocialLink link) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        link.setUser(user);
        return socialLinkRepository.save(link);
    }

    public List<SocialLink> getByUser(Long userId) {
        return socialLinkRepository.findByUserId(userId);
    }

    public SocialLink update(Long id, SocialLink updated) {
        SocialLink s = socialLinkRepository.findById(id).orElseThrow(() -> new RuntimeException("Social link not found"));
        s.setPlatform(updated.getPlatform());
        s.setUrl(updated.getUrl());
        return socialLinkRepository.save(s);
    }

    public void delete(Long id) {
        socialLinkRepository.deleteById(id);
    }
}
