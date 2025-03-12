import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage"
import { Global } from "@emotion/react";
import { global } from "./styles/global.js"

function App() {

  return (
    <>
      <Global styles={global} />
      <Router>
        <Routes>
          <Route path="/*" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App