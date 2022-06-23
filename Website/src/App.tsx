import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./styles.css";
import Layout from "./Layout";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import RehomePet from "./RehomePet";
import FindAPet from "./FindAPet";
import Dogs from "./Dogs";
import Cats from "./Cats";
import Pet from "./Pet";
import EditInfo from "./EditInfo";
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
        <Route path="/cats" element={<Cats />} />
        <Route path="/pet" element={<Pet />} />
        <Route path="/edit" element={<EditInfo />} />
      </Routes>
    </BrowserRouter>
  )
}