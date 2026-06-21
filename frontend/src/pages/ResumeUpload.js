import React, { useState } from 'react';
import { uploadResume } from '../api';

export default function ResumeUpload() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf') { setFile(f); setError(''); }
    else { setError('Please select a PDF file'); setFile(null); }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { setError('Please select a file'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const { data } = await uploadResume(user.id, fd);
      const updated = { ...user, resumePath: data.resumePath };
      localStorage.setItem('user', JSON.stringify(updated));
      setSuccess('Resume uploaded successfully!');
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const currentResume = user.resumePath;

  return (
    <div className="container">
      <div className="page-header"><h2>Resume Upload</h2></div>

      <div className="card">
        {currentResume && (
          <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
            Current resume: <strong>{currentResume}</strong>
          </div>
        )}

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleUpload}>
          <label className="upload-area" htmlFor="resume-input">
            <input id="resume-input" type="file" accept=".pdf" onChange={handleFile} />
            <div style={{ fontSize: '3rem' }}>📄</div>
            <p style={{ marginTop: '0.5rem', color: '#555' }}>
              {file ? file.name : 'Click to select PDF resume'}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.3rem' }}>PDF only, max 10MB</p>
          </label>

          <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </form>
      </div>
    </div>
  );
}
