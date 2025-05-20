import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { WellsTable } from "./Components/Wells";
import { Reports } from "./Components/Reports";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/reports" style={{ marginLeft: "10px" }}>
          Отчеты
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<WellsTable />} />
        <Route path="/reports/:id" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
