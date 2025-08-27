import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categoryApi';
import { getAllTags } from '../api/tagApi';
import { getAllReviews } from '../api/reviewApi';
import { getAllApps } from '../api/appApi';
import { getAllAppVersions } from '../api/appVersionApi';
import { getAllDownloadHistories } from '../api/downloadHistoryApi';
import { getUsers } from '../api/userApi';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [apps, setApps] = useState([]);
  const [appVersions, setAppVersions] = useState([]);
  const [downloadHistories, setDownloadHistories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers().then(data => setUsers(data)).catch(e => setError('User API'));
    getAllCategories().then(r => setCategories(r.data)).catch(e => setError('Category API'));
    getAllTags().then(r => setTags(r.data)).catch(e => setError('Tag API'));
    getAllReviews().then(r => setReviews(r.data)).catch(e => setError('Review API'));
    getAllApps().then(r => setApps(r.data)).catch(e => setError('App API'));
    getAllAppVersions().then(r => setAppVersions(r.data)).catch(e => setError('AppVersion API'));
    getAllDownloadHistories().then(r => setDownloadHistories(r.data)).catch(e => setError('DownloadHistory API'));
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
      {error && <div style={{color:'red'}}>API Error: {error}</div>}
      <h2>Users</h2>
      <pre>{JSON.stringify(users.slice(0,2), null, 2)}</pre>
      <h2>Categories</h2>
      <pre>{JSON.stringify(categories.slice(0,2), null, 2)}</pre>
      <h2>Tags</h2>
      <pre>{JSON.stringify(tags.slice(0,2), null, 2)}</pre>
      <h2>Reviews</h2>
      <pre>{JSON.stringify(reviews.slice(0,2), null, 2)}</pre>
      <h2>Apps</h2>
      <pre>{JSON.stringify(apps.slice(0,2), null, 2)}</pre>
      <h2>App Versions</h2>
      <pre>{JSON.stringify(appVersions.slice(0,2), null, 2)}</pre>
      <h2>Download Histories</h2>
      <pre>{JSON.stringify(downloadHistories.slice(0,2), null, 2)}</pre>
    </div>
  );
};

export default HomePage;
