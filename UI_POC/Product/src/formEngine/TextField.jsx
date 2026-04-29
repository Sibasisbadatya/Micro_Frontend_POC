// TextField.jsx
import React from 'react';
import { TextField as MUITextField } from '@mui/material';

const TextField = ({ label, value, onChange, required, error, helperText, ...rest }) => (
  <MUITextField
    fullWidth
    variant="outlined"
    margin="normal"
    label={label}
    value={value || ''}
    onChange={e => onChange(e.target.value)}
    required={required}
    error={Boolean(error)}
    helperText={helperText || (error || '')}
    {...rest}
  />
);

export default TextField;
