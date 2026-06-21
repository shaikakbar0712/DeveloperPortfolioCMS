import React, { useEffect, useState } from 'react';
import { getCertifications, addCertification, updateCertification, deleteCertification } from '../api';

const emptyForm = { certificateName: '', issuer: '' };

export default function Certifications() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const load = () => getCertifications(user.id).then(r => setCerts(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setError(''); setShowModal(true); };
  const openEdit = (c) => { setForm({ certificateName: c.certificateName, issuer: c.issuer }); setEditId(c.id); setError(''); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    try {
      if (editId) { await updateCertification(editId, form); }
      else { await addCertification(user.id, form); }
      setShowModal(false); load();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this certification?')) { await deleteCertification(id); load(); }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Certifications</h2>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Certification</button>
      </div>

      <div className="card">
        {certs.length === 0 ? <p style={{ color: '#999' }}>No certifications yet.</p> : (
          <ul className="item-list">
            {certs.map(c => (
              <li key={c.id}>
                <div className="item-info">
                  <h4>{c.certificateName}</h4>
                  <p>Issued by: {c.issuer}</p>
                </div>
                <div className="item-actions">
                  <button className="btn btn-edit" onClick={() => openEdit(c)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(c.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editId ? 'Edit Certification' : 'Add Certification'}</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Certificate Name</label>
                <input value={form.certificateName} required onChange={e => setForm({ ...form, certificateName: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Issuer</label>
                <input value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} />
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
