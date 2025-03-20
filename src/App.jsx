import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Global } from "@emotion/react";
import { global } from "./styles/global.js";
import AuthRoute from "./routes/AuthRoute/AuthRoute.jsx";
import MainRoute from "./routes/MainRoute/MainRoute.jsx";

function App() {
  return (
    <Router> {/* ✅ Router는 최상위에서 한 번만 선언 */}
      <Global styles={global} /> {/* ✅ 전역 스타일은 Router 바깥에 있어도 무방 */}
      <Routes>
        <Route path="/auth*" element={<AuthRoute />} />
        <Route path="/*" element={<MainRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
