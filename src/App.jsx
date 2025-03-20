import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Global } from "@emotion/react";
import { global } from "./styles/global.js"
import AuthRoute from "./routes/AuthRoute/AuthRoute.jsx";
import MainRoute from "./routes/MainRoute/MainRoute.jsx";
import TrainerPage from "./pages/TrainerPage/TrainerPage.jsx";


function App() {

  return (
    <>
      <Global styles={global} />
      <Router>
      <Routes>
					<Route path="/auth/*" element={<AuthRoute />} />
					<Route path="/*" element={<MainRoute />} />
					<Route path="/*" element={<TrainerPage />} />
				</Routes>
      </Router>
    </>
  )
}

export default App