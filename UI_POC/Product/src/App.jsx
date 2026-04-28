import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import ItemsTable from './Components/ItemsTable';
import ColumnConfigPanel from './Components/ColumnConfigPanel';

function App() {
  return (
    <BrowserRouter>
      <div style={{ marginBottom: 20 }}>
        <Link to="/table" style={{ marginRight: 16 }}>Table</Link>
        <Link to="/config">Column Config</Link>
      </div>
      <Routes>
        <Route path="/table" element={<ItemsTable />} />
        <Route path="/config" element={<ColumnConfigPanel />} />
        <Route path="*" element={<div>Hello Sibasis Badatya, Welcome to Product UI POC</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;