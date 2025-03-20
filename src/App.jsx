import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Global } from "@emotion/react";
import { global } from "./styles/global.js";
import AuthRoute from "./routes/AuthRoute/AuthRoute.jsx";
import MainRoute from "./routes/MainRoute/MainRoute.jsx";

function App() {
  return (
    <Router> {/* ✅ BrowserRouter가 필요함 */}
      <Global styles={global} />
      <Routes>
        <Route path="/auth/*" element={<AuthRoute />} />
        <Route path="/*" element={<MainRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
