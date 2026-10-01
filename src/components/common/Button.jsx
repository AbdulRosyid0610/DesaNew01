import React from 'react';

const Button = ({
  children,
  className = '',
  type = 'button',
  style,
  onClick,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={className}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;