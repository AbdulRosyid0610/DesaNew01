// src/components/common/Badge.jsx

import React from 'react';
import './Badge.css';

const Badge = ({ children, className = '', style, ...props }) => {
  return (
    <span
      className={`badge ${className}`}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;