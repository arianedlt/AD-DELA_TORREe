import React, { useEffect, useState } from 'react';
import GenerateLink from '../components/GenerateLink';
import Message from '../components/Message';
import Inbox from './Inbox';


function Home() {
  const [greeting, setGreeting] = useState('');
  const [username, setUsername] = useState('User');
  const [showComponent, setShowComponent] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();

    setGreeting(
      hour < 12
        ? 'Good Morning'
        : hour < 18
        ? 'Good Afternoon'
        : 'Good Evening'
    );

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.userId) {
      fetch('http://localhost:3001/api/user/${storedUser.userId}')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch user');
          return res.json();
        })
        .then((data) => setUsername(data.username))
        .catch(() => {
          setUsername(storedUser.username || 'User');
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="home-page">

      {/* TOP BAR */}
      <header className="home-header">

        {/* LEFT */}
        <div className="header-left">
          <button
            className="profile-btn"
            onClick={() => alert('Profile')}
          >
            👤 Profile
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* RIGHT */}
        <div className="app-logo">
          NGILOP <span>APP</span>
        </div>

      </header>


      {/* MAIN CONTENT */}
      <main className="home-content">

        <div className="welcome-section">

          <div className="logo-circle">
            💬
          </div>

          <h1>
            {greeting}, <span>{username}!</span>
          </h1>

          <p>
            What would you like to do?
          </p>

        </div>


        {/* ACTION BUTTONS */}
        <div className="action-container">

          <button
            className="action-card anonymous"
            onClick={() => setShowComponent('message')}
          >
            <div className="action-icon">💌</div>

            <div className="action-text">
              <strong>Send Anonymous Message</strong>
              <small>Send a secret message</small>
            </div>

            <span className="arrow">›</span>
          </button>


          <button
            className="action-card"
            onClick={() => setShowComponent('generate')}
          >
            <div className="action-icon">🔗</div>

            <div className="action-text">
              <strong>Generate Link</strong>
              <small>Create your anonymous link</small>
            </div>

            <span className="arrow">›</span>
          </button>


          <button
            className="action-card"
            onClick={() => setShowComponent('inbox')}
          >
            <div className="action-icon">📥</div>

            <div className="action-text">
              <strong>Inbox</strong>
              <small>View your messages</small>
            </div>

            <span className="arrow">›</span>
          </button>

        </div>


        {/* COMPONENT */}
        {showComponent && (
          <div className="component-container">

            <button
              className="close-component"
              onClick={() => setShowComponent(null)}
            >
              ✕
            </button>

            {showComponent === 'generate' && <GenerateLink />}

            {showComponent === 'message' && <Message />}

            {showComponent === 'inbox' && <Inbox />}

          </div>
        )}

      </main>

    </div>
  );
}

export default Home;