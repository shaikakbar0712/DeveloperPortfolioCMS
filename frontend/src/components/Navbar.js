import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/dashboard" className="brand">PortfolioCMS</Link>
      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/skills">Skills</Link></li>
        <li><Link to="/certifications">Certs</Link></li>
        <li><Link to="/social-links">Social</Link></li>
        <li><Link to="/resume">Resume</Link></li>
        <li><Link to={`/portfolio/${user.id}`} target="_blank">Public</Link></li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </nav>
  );
}
