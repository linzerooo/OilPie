import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { WellsPage } from "../Pages/WellsPage";
import { ReportPage } from "../Pages/ReportPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Главная</Link>
      </nav>
      <Routes>
        <Route path="/" element={<WellsPage />} />
        <Route path="/reports/:id" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
