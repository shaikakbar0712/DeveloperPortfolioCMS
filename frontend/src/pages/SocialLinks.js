import React, { useEffect, useState } from 'react';
import { getSocialLinks, addSocialLink, updateSocialLink, deleteSocialLink } from '../api';

const emptyForm = { platform: '', url: '' };
const platforms = ['GitHub', 'LinkedIn', 'Twitter', 'Portfolio', 'Instagram', 'YouTube', 'Other'];

export default function SocialLinks() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const load = () => getSocialLinks(user.id).then(r => setLinks(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setError(''); setShowModal(true); };
  const openEdit = (l) => { setForm({ platform: l.platform, url: l.url }); setEditId(l.id); setError(''); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    try {
      if (editId) { await updateSocialLink(editId, form); }
      else { await addSocialLink(user.id, form); }
      setShowModal(false); load();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this link?')) { await deleteSocialLink(id); load(); }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Social Links</h2>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Link</button>
      </div>

      <div className="card">
        {links.length === 0 ? <p style={{ color: '#999' }}>No social links yet.</p> : (
          <ul className="item-list">
            {links.map(l => (
              <li key={l.id}>
                <div className="item-info">
                  <h4>{l.platform}</h4>
                  <a href={l.url} target="_blank" rel="noreferrer" style={{ color: '#e94560', fontSize: '0.85rem' }}>{l.url}</a>
                </div>
                <div className="item-actions">
                  <button className="btn btn-edit" onClick={() => openEdit(l)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(l.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editId ? 'Edit Social Link' : 'Add Social Link'}</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Platform</label>
                <select value={form.platform} required onChange={e => setForm({ ...form, platform: e.target.value })}>
                  <option value="">Select platform</option>
                  {platforms.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>URL</label>
                <input value={form.url} required type="url" onChange={e => setForm({ ...form, url: e.target.value })} placeholder="https://" />
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
