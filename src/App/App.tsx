import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./app.css";
import { WellsPage } from "@pages/wellsPage";
import { ReportPage } from "@pages/reportPage";

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
