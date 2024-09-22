import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssVarsProvider, extendTheme } from "@mui/joy";

import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";

function App() {
  // overwriting mui/joy theming
  const theme = extendTheme({
    fontFamily: {
      display: "General Sans, sans-serif",
      body: "General Sans, sans-serif",
    },
  });

  return (
    <BrowserRouter>
      <CssVarsProvider theme={theme}>
        <Routes>
          <Route path='/' element={<SignupPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </CssVarsProvider>
    </BrowserRouter>
  );
}

export default App;
