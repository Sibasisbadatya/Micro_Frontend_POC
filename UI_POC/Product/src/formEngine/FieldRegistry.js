// FieldRegistry.js
// Registry for field types, can be extended by clients

import TextField from './TextField';
import SelectField from './SelectField';

const fieldRegistry = {
  text: TextField,
  select: SelectField,
  // Add more built-in fields here
};

export default fieldRegistry;