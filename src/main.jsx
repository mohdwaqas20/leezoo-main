import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import VideoIntro from './components/VideoIntro';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VideoIntro>
      <App />
    </VideoIntro>
  </React.StrictMode>
);