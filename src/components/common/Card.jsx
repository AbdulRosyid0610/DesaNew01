import React from 'react';

const Card = ({
  children,
  className = '',
  style,
  onClick,
  ...props
}) => {
  return (
    <div
      className={`card ${className}`}
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;