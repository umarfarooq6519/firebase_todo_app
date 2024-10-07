// TODO
// 1. add task title, description and due date. DONE
// 2. add framer motion animations
// 3. outline the task red, if overdue
import { BrowserRouter, Routes, Route } from "react-router-dom";

// following are the only routes needed for this app
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import OngoingTasksPage from "./pages/OngoingTasksPage";
import CompletedTasksPage from "./pages/CompletedTasksPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
        {/* Dashboard */}
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path='ongoing' element={<OngoingTasksPage />} />
          <Route path='completed' element={<CompletedTasksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
