import React from 'react';
import './App.css';
import DynamicShippingAddressForm from './formEngine/DynamicShippingAddressForm';
import { Container, Typography } from '@mui/material';

const schema = [
  { key: 'shipToId', label: 'Ship To Id', type: 'text', required: true },
  { key: 'shipToName', label: 'Ship To Name', type: 'text', required: true },
  { key: 'street1', label: 'Street 1', type: 'text', required: true },
  { key: 'street2', label: 'Street 2', type: 'text', required: false },
  { key: 'street3', label: 'Street 3', type: 'text', required: false },
  { key: 'state', label: 'State', type: 'text', hidden: true },
  { key: 'zip', label: 'Postal Code', type: 'text', required: true }
];

function App() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>Shipping Address (Product)</Typography>
      <DynamicShippingAddressForm
        schema={schema}
        initialValues={{}}
        onSave={data => {
          // simple feedback
          alert('Saved from Product: ' + JSON.stringify(data, null, 2));
        }}
      />
    </Container>
  );
}

export default App;