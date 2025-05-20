import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import { WellsTable } from './Components/Wells';
import { Reports } from './Components/Reports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reports" element={<Reports />} />
        <Route path="/" element={<WellsTable />} />
      </Routes>
    </Router>
  );
}

export default App;
