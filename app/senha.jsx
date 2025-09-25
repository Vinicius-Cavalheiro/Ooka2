import React, { useState } from 'react';

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
   <div>
      <button
        onClick={togglePasswordVisibility}
        type="button"
        style={{
          marginLeft: '8px',
          padding: '8px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: 'none',
        }}
      >
        {showPassword ? '👁️' : '🙈'}
      </button>
    </div>
  );
};

export default PasswordInput;

   
     