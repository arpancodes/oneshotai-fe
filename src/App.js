import { Routes, Route } from "react-router-dom";
import Colleges from "./pages/Colleges";
import CollegeDetails from "./pages/CollegeDetails";
import StudentDetails from "./pages/StudentDetails";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="bg-gray-50 min-h-[100vh] py-10 px-2">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/colleges/:id" element={<CollegeDetails />} />
        <Route
          path="/colleges/:id/student/:studentId"
          element={<StudentDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;
