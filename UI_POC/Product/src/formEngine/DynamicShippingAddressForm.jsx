// DynamicShippingAddressForm.jsx
import React, { useState } from 'react';
import fieldRegistry from './FieldRegistry';
import { Box, Grid, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function validateField(field, value) {
  if (field.required && !value) {
    return `${field.label || field.key} is required`;
  }
  if (field.validate) {
    for (const rule of field.validate) {
      if (rule.type === 'regex' && !new RegExp(rule.value).test(value)) {
        return rule.message || `${field.label || field.key} is invalid`;
      }
    }
  }
  return null;
}

const DynamicShippingAddressForm = ({ schema, initialValues = {}, onSave, fieldRegistry: customRegistry }) => {
  const registry = { ...fieldRegistry, ...customRegistry };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setValues(v => ({ ...v, [key]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    schema.forEach(field => {
      if (!field.hidden) {
        const err = validateField(field, values[field.key]);
        if (err) newErrors[field.key] = err;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Build payload dynamically
      const payload = schema.reduce((acc, field) => {
        if (!field.hidden) acc[field.key] = values[field.key];
        return acc;
      }, {});
      onSave(payload);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {schema.filter(f => !f.hidden).map(field => {
          const FieldComp = registry[field.type || 'text'] || registry.text;
          return (
            <Grid item xs={12} sm={field.fullWidth === false ? 6 : 12} key={field.key}>
              <FieldComp
                label={field.label || field.key}
                value={values[field.key]}
                onChange={val => handleChange(field.key, val)}
                required={field.required}
                error={errors[field.key]}
                helperText={errors[field.key]}
                {...field}
              />
            </Grid>
          );
        })}
        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />} size="large">
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DynamicShippingAddressForm;
