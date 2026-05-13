import React from 'react';
import './Background.css';

const Background = () => {
  return (
    <div className="background-container">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="noise-overlay"></div>
    </div>
  );
};

export default Background;
