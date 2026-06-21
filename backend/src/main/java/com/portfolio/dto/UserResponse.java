package com.portfolio.dto;

public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String resumePath;

    public UserResponse(Long id, String name, String email, String resumePath) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.resumePath = resumePath;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getResumePath() { return resumePath; }
}
