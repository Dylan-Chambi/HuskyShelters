import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./styles.css";
import Layout from "./Layout";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import RehomePet from "./RehomePet";
import FindAPet from "./FindAPet";
import Dogs from "./Dogs";
import Pet from "./Pet";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/rehome" element={<RehomePet />} />
        <Route path="/find" element={<FindAPet />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/pet" element={<Pet />} />
      </Routes>
    </BrowserRouter>
  )
}