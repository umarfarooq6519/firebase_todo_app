// TODO
// 1. add task title, description and due date. DONE
// 2. add shared tasks option
// 3. add framer motion animations
import { BrowserRouter, Routes, Route } from "react-router-dom";

// following are the only routes needed for this app
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import DashboardPage from "./pages/DashboardPage";
import OngoingTasksPage from "./pages/OngoingTasksPage";
import CompletedTasksPage from "./pages/CompletedTasksPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/ongoing' element={<OngoingTasksPage />} />
        <Route path='/completed' element={<CompletedTasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
