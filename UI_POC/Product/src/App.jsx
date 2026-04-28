import './App.css';

const fieldsToShow = [
  { key: "shipToId", label: "Ship To Id", required: true },
  { key: "shipToName", label: "Ship To Name", required: true },
  { key: "street1", label: "Street 1", required: true },
  { key: "street2", label: "Street 2", required: false },
  { key: "state", label: "State", required: false },
  { key: "zip", label: "Zip Code", required: true }
];

function App() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Fields to be shown</h2>
      <ul>
        {fieldsToShow.map(field => (
          <li key={field.key}>
            <b>{field.label}</b> {field.required ? '(required)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;