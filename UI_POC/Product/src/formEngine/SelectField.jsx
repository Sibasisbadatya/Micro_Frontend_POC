// SelectField.jsx
import React from 'react';
import { FormControl, InputLabel, Select as MUISelect, MenuItem, FormHelperText } from '@mui/material';

const SelectField = ({ label, value, onChange, options = [], required, error, helperText, ...rest }) => (
  <FormControl fullWidth margin="normal" error={Boolean(error)} required={required}>
    <InputLabel>{label}</InputLabel>
    <MUISelect
      label={label}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      {...rest}
    >
      <MenuItem value="">Select...</MenuItem>
      {options.map(opt => (
        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
      ))}
    </MUISelect>
    { (helperText || error) && <FormHelperText>{helperText || error}</FormHelperText> }
  </FormControl>
);

export default SelectField;
