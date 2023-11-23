import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateDatabase from "./screens/updateDatabase";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UpdateDatabase />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
