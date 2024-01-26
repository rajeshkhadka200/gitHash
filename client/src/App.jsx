import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import toast, { Toaster } from "react-hot-toast";
import Repo from "./pages/Repo";
function App() {
  return (
    <>
      <Toaster />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/repo" element={<Repo />}></Route>
      </Routes>
    </>
  );
}

export default App;
