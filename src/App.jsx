import { BrowserRouter, Routes, Route } from "react-router-dom";

// following are the only routes needed for this app.
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
