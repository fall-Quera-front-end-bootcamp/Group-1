// Import the necessary components from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layout/authLayout.tsx/AuthLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
