package com.portfolio.dto;

import java.util.List;

public class PortfolioResponse {
    private UserResponse user;
    private List<?> projects;
    private List<?> skills;
    private List<?> certifications;
    private List<?> socialLinks;

    public UserResponse getUser() { return user; }
    public void setUser(UserResponse user) { this.user = user; }
    public List<?> getProjects() { return projects; }
    public void setProjects(List<?> projects) { this.projects = projects; }
    public List<?> getSkills() { return skills; }
    public void setSkills(List<?> skills) { this.skills = skills; }
    public List<?> getCertifications() { return certifications; }
    public void setCertifications(List<?> certifications) { this.certifications = certifications; }
    public List<?> getSocialLinks() { return socialLinks; }
    public void setSocialLinks(List<?> socialLinks) { this.socialLinks = socialLinks; }
}
