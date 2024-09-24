import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Results from "../components/Results";
import Search from "../components/Search";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Hello</div>} />
        <Route path="/search" element={<Search />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}
