import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/authPages/UserLogin";
import Home from "./pages/Home";
const router = (
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/user-login" element={<UserLogin />} />
  </Routes>
);
function App() {
  return <div>{router}</div>;
}

export default App;
