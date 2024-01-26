import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import toast, { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
