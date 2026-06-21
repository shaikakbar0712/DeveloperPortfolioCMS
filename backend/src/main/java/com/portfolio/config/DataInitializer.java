package com.portfolio.config;

import com.portfolio.entity.*;
import com.portfolio.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(UserRepository ur, ProjectRepository pr,
                               SkillRepository sr, CertificationRepository cr,
                               SocialLinkRepository slr) {
        return args -> {
            User user = new User();
            user.setName("Alex Johnson");
            user.setEmail("alex@example.com");
            user.setPassword("password123");
            User saved = ur.save(user);

            Project p1 = new Project();
            p1.setTitle("E-Commerce Platform");
            p1.setDescription("Full-stack e-commerce app with cart, payments, and admin panel.");
            p1.setTechStack("React, Spring Boot, MySQL");
            p1.setGithubLink("https://github.com/example/ecommerce");
            p1.setUser(saved);
            pr.save(p1);

            Project p2 = new Project();
            p2.setTitle("Portfolio CMS");
            p2.setDescription("Developer portfolio content management system.");
            p2.setTechStack("React, Spring Boot, H2");
            p2.setGithubLink("https://github.com/example/portfolio-cms");
            p2.setUser(saved);
            pr.save(p2);

            Skill s1 = new Skill(); s1.setSkillName("Java"); s1.setLevel("Expert"); s1.setUser(saved); sr.save(s1);
            Skill s2 = new Skill(); s2.setSkillName("React"); s2.setLevel("Advanced"); s2.setUser(saved); sr.save(s2);
            Skill s3 = new Skill(); s3.setSkillName("Spring Boot"); s3.setLevel("Advanced"); s3.setUser(saved); sr.save(s3);
            Skill s4 = new Skill(); s4.setSkillName("SQL"); s4.setLevel("Intermediate"); s4.setUser(saved); sr.save(s4);

            Certification c1 = new Certification(); c1.setCertificateName("AWS Certified Developer"); c1.setIssuer("Amazon Web Services"); c1.setUser(saved); cr.save(c1);
            Certification c2 = new Certification(); c2.setCertificateName("Spring Professional"); c2.setIssuer("VMware"); c2.setUser(saved); cr.save(c2);

            SocialLink sl1 = new SocialLink(); sl1.setPlatform("GitHub"); sl1.setUrl("https://github.com/alexjohnson"); sl1.setUser(saved); slr.save(sl1);
            SocialLink sl2 = new SocialLink(); sl2.setPlatform("LinkedIn"); sl2.setUrl("https://linkedin.com/in/alexjohnson"); sl2.setUser(saved); slr.save(sl2);
        };
    }
}
