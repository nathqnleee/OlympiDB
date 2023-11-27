import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageDatabase from "./screens/manageDatabase";
import SearchDatabase from "./screens/searchDatabase";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ManageDatabase />} />
          <Route path="/searchDatabase" element={<SearchDatabase />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
