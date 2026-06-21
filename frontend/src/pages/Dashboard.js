import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, getSkills, getCertifications, getSocialLinks } from '../api';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [counts, setCounts] = useState({ projects: 0, skills: 0, certs: 0, social: 0 });

  useEffect(() => {
    Promise.all([
      getProjects(user.id),
      getSkills(user.id),
      getCertifications(user.id),
      getSocialLinks(user.id)
    ]).then(([p, s, c, sl]) => {
      setCounts({ projects: p.data.length, skills: s.data.length, certs: c.data.length, social: sl.data.length });
    }).catch(() => {});
  }, [user.id]);

  return (
    <div className="container">
      <div className="card">
        <h2>👋 Hello, {user.name}</h2>
        <p style={{ color: '#666', marginTop: '0.3rem' }}>{user.email}</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-number">{counts.projects}</div>
          <div className="stat-label">Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{counts.skills}</div>
          <div className="stat-label">Skills</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{counts.certs}</div>
          <div className="stat-label">Certifications</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{counts.social}</div>
          <div className="stat-label">Social Links</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
        <div className="quick-links">
          <Link to="/projects" className="btn btn-primary">+ Add Project</Link>
          <Link to="/skills" className="btn btn-secondary">+ Add Skill</Link>
          <Link to="/certifications" className="btn btn-primary">+ Add Certification</Link>
          <Link to="/social-links" className="btn btn-secondary">+ Add Social Link</Link>
          <Link to="/resume" className="btn btn-primary">Upload Resume</Link>
          <Link to={`/portfolio/${user.id}`} target="_blank" className="btn btn-secondary">View Portfolio</Link>
        </div>
      </div>
    </div>
  );
}
