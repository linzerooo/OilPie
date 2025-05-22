import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { WellsPage } from "../Pages/WellsPage";
import { ReportPage } from "../Pages/ReportPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/OilPie/">Главная</Link>
      </nav>
      <Routes>
        <Route path="/OilPie/" element={<WellsPage />} />
        <Route path="/reports/:id" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
