import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageDatabase from "./screens/manageDatabase";
import SearchDatabase from "./screens/searchDatabase";
import FrontPage from "./screens/frontPage";
import LoginPage from "./screens/LoginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/manageDatabase" element={<ManageDatabase />} />
          <Route path="/searchDatabase" element={<SearchDatabase />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
