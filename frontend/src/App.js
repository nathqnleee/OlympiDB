import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateDatabase from "./screens/updateDatabase";
import SearchDatabase from "./screens/searchDatabase";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UpdateDatabase />} />
          <Route path="/searchDatabase" element={<SearchDatabase />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
