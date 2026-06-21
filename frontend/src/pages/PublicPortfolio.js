import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPortfolio } from '../api';

export default function PublicPortfolio() {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getPortfolio(userId)
      .then(r => setPortfolio(r.data))
      .catch(() => setError('Portfolio not found'));
  }, [userId]);

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>😕 Portfolio Not Found</h2>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>The requested portfolio does not exist.</p>
      </div>
    </div>
  );

  if (!portfolio) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Loading portfolio...</p>
    </div>
  );

  const { user, projects, skills, certifications, socialLinks } = portfolio;

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="portfolio-hero">
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        {user.resumePath && (
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#7ecff0' }}>
            📄 Resume: {user.resumePath}
          </p>
        )}
      </div>

      {skills.length > 0 && (
        <div className="card portfolio-section">
          <h3>Skills</h3>
          <div className="skills-grid">
            {skills.map(s => (
              <span key={s.id} className="skill-badge">
                {s.skillName}<span>{s.level}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="card portfolio-section">
          <h3>Projects</h3>
          {projects.map(p => (
            <div key={p.id} className="project-card">
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              {p.techStack && <p><strong>Stack:</strong> {p.techStack}</p>}
              {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer">View on GitHub ↗</a>}
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div className="card portfolio-section">
          <h3>Certifications</h3>
          <ul className="item-list">
            {certifications.map(c => (
              <li key={c.id}>
                <div className="item-info">
                  <h4>{c.certificateName}</h4>
                  <p>{c.issuer}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {socialLinks.length > 0 && (
        <div className="card portfolio-section">
          <h3>Connect</h3>
          <div className="social-links">
            {socialLinks.map(s => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="social-link">
                {s.platform}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
