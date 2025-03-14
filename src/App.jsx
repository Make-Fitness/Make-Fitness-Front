import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage"
import { Global } from "@emotion/react";
import { global } from "./styles/global.js"
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import LogInPage from "./pages/LogInPage/LogInPage.jsx";
import { QueryClient } from "@tanstack/react-query";

function App() {

  return (
    <>
      <Global styles={global} />
      <Router>
        <Routes>
          <Route path="/*" element={<MainPage />} />
          <Route path="/auth/signup*" element={<SignUpPage />} />
          <Route path="/auth/signin*" element={<LogInPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App