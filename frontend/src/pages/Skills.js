import React, { useEffect, useState } from 'react';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../api';

const emptyForm = { skillName: '', level: 'Beginner' };
const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function Skills() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const load = () => getSkills(user.id).then(r => setSkills(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setError(''); setShowModal(true); };
  const openEdit = (s) => { setForm({ skillName: s.skillName, level: s.level }); setEditId(s.id); setError(''); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    try {
      if (editId) { await updateSkill(editId, form); }
      else { await addSkill(user.id, form); }
      setShowModal(false); load();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this skill?')) { await deleteSkill(id); load(); }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Skills</h2>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Skill</button>
      </div>

      <div className="card">
        {skills.length === 0 ? <p style={{ color: '#999' }}>No skills yet.</p> : (
          <ul className="item-list">
            {skills.map(s => (
              <li key={s.id}>
                <div className="item-info">
                  <h4>{s.skillName}</h4>
                  <p>Level: {s.level}</p>
                </div>
                <div className="item-actions">
                  <button className="btn btn-edit" onClick={() => openEdit(s)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editId ? 'Edit Skill' : 'Add Skill'}</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Skill Name</label>
                <input value={form.skillName} required onChange={e => setForm({ ...form, skillName: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Level</label>
                <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
                  {levels.map(l => <option key={l}>{l}</option>)}
                </select>
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
