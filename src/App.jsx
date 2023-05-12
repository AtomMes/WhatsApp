import ChatPage from "./pages/ChatPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotPage from "./pages/NotPage";
import "./index.css";


function App() {
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/not" element={<NotPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <button onClick={() => navigate("/not")}>not</button>
      <button onClick={() => navigate("/")}>mes</button>
    </div>
  );
}

export default App;
