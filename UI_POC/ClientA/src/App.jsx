// App.jsx

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ItemsTable from "./Components/CustomTable";
import ColumnConfigPanel from "./Components/ColumnConfigPanel";

// Shared columns definition (move your MOCK_COLUMNS here)
import mockColumns from "./Data/mockColumns";
import mockData from "./Data/mockData";
function App() {
  const [columns, setColumns] = useState(mockColumns);
  const [data, setData] = useState(mockData);

  // Handler to update data when a row is saved
  const handleSave = (updatedRow) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === updatedRow.id ? { ...row, ...updatedRow } : row
      )
    );
  };

  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <Link to="/table" style={{ marginRight: 16 }}>
            Table
          </Link>
          <Link to="/config">Column Config for CLint A</Link>
        </div>

        <Routes>
          <Route path="/table" element={<ItemsTable columns={columns} data={data} onSave={handleSave} />} />
          <Route path="/config" element={<ColumnConfigPanel value={columns} onChange={setColumns} />} />
          <Route
            path="*"
            element={<div>Hello Sibasis Badatya, Welcome to Product UI POC</div>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;