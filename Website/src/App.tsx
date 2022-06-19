import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./styles.css";
import Layout from "./Layout";
import ContactUs from "./ContactUs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  )
}