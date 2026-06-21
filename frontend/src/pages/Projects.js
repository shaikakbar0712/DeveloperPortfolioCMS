import React, { useEffect, useState } from 'react';
import { getProjects, addProject, updateProject, deleteProject } from '../api';

const emptyForm = { title: '', description: '', techStack: '', githubLink: '' };

export default function Projects() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const load = () => getProjects(user.id).then(r => setProjects(r.data)).catch(() => {});

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setError(''); setShowModal(true); };
  const openEdit = (p) => { setForm({ title: p.title, description: p.description, techStack: p.techStack, githubLink: p.githubLink }); setEditId(p.id); setError(''); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    try {
      if (editId) { await updateProject(editId, form); }
      else { await addProject(user.id, form); }
      setShowModal(false); load();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      await deleteProject(id); load();
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Projects</h2>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Project</button>
      </div>

      <div className="card">
        {projects.length === 0 ? <p style={{ color: '#999' }}>No projects yet. Add your first one!</p> : (
          <ul className="item-list">
            {projects.map(p => (
              <li key={p.id}>
                <div className="item-info">
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                  <p><strong>Stack:</strong> {p.techStack}</p>
                  {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" style={{ color: '#e94560', fontSize: '0.85rem' }}>GitHub ↗</a>}
                </div>
                <div className="item-actions">
                  <button className="btn btn-edit" onClick={() => openEdit(p)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editId ? 'Edit Project' : 'Add Project'}</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input value={form.title} required onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Tech Stack</label>
                <input value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} placeholder="React, Spring Boot, ..." />
              </div>
              <div className="form-group">
                <label>GitHub Link</label>
                <input value={form.githubLink} onChange={e => setForm({ ...form, githubLink: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
