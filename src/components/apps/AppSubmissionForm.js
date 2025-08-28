import React, { useState } from 'react';
import { createApp } from '../../api/appApi';
import { useAuthContext } from '../../context/AuthContext';

const AppSubmissionForm = ({ onSuccess }) => {
  const { user } = useAuthContext();
  const [form, setForm] = useState({
    name: '',
    description: '',
    categoryId: '',
    tags: '',
    website: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'DEVELOPER') {
    return <div>Only developers can submit new apps.</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()),
      };
      await createApp(payload);
      setForm({ name: '', description: '', categoryId: '', tags: '', website: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to submit app.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a New App</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>App Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Category ID</label>
        <input name="categoryId" value={form.categoryId} onChange={handleChange} required />
      </div>
      <div>
        <label>Tags (comma separated)</label>
        <input name="tags" value={form.tags} onChange={handleChange} />
      </div>
      <div>
        <label>Website</label>
        <input name="website" value={form.website} onChange={handleChange} />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit App'}</button>
    </form>
  );
};

export default AppSubmissionForm;
