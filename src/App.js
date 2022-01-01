import { Routes, Route } from "react-router-dom";
import Colleges from "./pages/Colleges";
import CollegeDetails from "./pages/CollegeDetails";
import StudentDetails from "./pages/StudentDetails";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/colleges/:id" element={<CollegeDetails />} />
        <Route path="/colleges/:id/student/:studentId" element={<StudentDetails />} />
      </Routes>
    </>
  );
}

export default App;
