// SelectField.jsx
import React from 'react';

const SelectField = ({ label, value, onChange, options = [], required, ...rest }) => (
  <div style={{ marginBottom: 12 }}>
    <label>
      {label} {required && '*'}
      <select
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        required={required}
        {...rest}
      >
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </label>
  </div>
);

export default SelectField;
