import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersList from "./features/users/UsersList";
import UserDetail from "./features/users/UserDetail";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
