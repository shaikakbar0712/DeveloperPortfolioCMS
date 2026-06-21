package com.portfolio.service;

import com.portfolio.entity.Skill;
import com.portfolio.entity.User;
import com.portfolio.repository.SkillRepository;
import com.portfolio.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    public SkillService(SkillRepository skillRepository, UserRepository userRepository) {
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    public Skill add(Long userId, Skill skill) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        skill.setUser(user);
        return skillRepository.save(skill);
    }

    public List<Skill> getByUser(Long userId) {
        return skillRepository.findByUserId(userId);
    }

    public Skill update(Long id, Skill updated) {
        Skill s = skillRepository.findById(id).orElseThrow(() -> new RuntimeException("Skill not found"));
        s.setSkillName(updated.getSkillName());
        s.setLevel(updated.getLevel());
        return skillRepository.save(s);
    }

    public void delete(Long id) {
        skillRepository.deleteById(id);
    }
}
