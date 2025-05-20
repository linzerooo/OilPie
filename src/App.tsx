import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import { Wells } from './Wells';
import { Reports } from './Reports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reports" element={<Reports />} />
        <Route path="/" element={<Wells />} />
      </Routes>
    </Router>
  );
}

export default App;
