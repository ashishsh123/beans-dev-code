import "../src/components/App.css";
import Textgenerate from "./components/Textgenerate";
import Otp from "./components/Otp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/otp" element={<Otp />}></Route>
          <Route path="/" element={<Textgenerate />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
