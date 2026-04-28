// TextField.jsx
import React from 'react';

const TextField = ({ label, value, onChange, required, ...rest }) => (
  <div style={{ marginBottom: 12 }}>
    <label>
      {label} {required && '*'}
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        required={required}
        {...rest}
      />
    </label>
  </div>
);

export default TextField;
