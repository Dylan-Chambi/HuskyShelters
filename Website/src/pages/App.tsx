import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import Layout from "./Layout";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import RehomePet from "./RehomePet";
import FindAPet from "./FindAPet";
import Pet from "./Pet";
import Dogs from "./Dogs";
import Cats from "./Cats";

import EditInfo from "./EditInfo";
import Logo from "../images/logo5.png";
import Logo2 from "../images/logo4.png";

// Import precompiled Bootstrap css
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default function App() {
  return (
    <div className="bg-warning " style = {{ position: "absolute", height: "fit-content", width: "100%", minHeight: "100vh", top: "0", left: "0" }}>
      <nav className="navbar bg-gradient bg-dark  ixed-top">
        <div className="navbard-flex justify-content-around ">
        
          <h3 className="text-warning">
          <img
              className="mx-4 text-warning"
              src={Logo}
              alt=""
              width="50"
              height="50"
            />
            
            Husky Shelters
           
            
          </h3>
        </div>
        <div className="navbar-brand justify-content-between" >
          <nav className="nav">
              <Link to="/" className="text-decoration-none">
                <p className="nav-link active text-warning">
                  Home
                </p>
              </Link>
              <Link to="/contact" className="text-decoration-none">
              <p className="nav-link active text-warning">
                  Contact Us
                </p>
              </Link>

              <Link to="/about" className="text-decoration-none">
                <p className="nav-link active text-warning">
                  About Us
                </p>
              </Link>
              <Link to="/rehome" className="text-decoration-none">
                <p className="nav-link active text-warning" >
                  Rehome a Pet
                </p>
              </Link>
              <Link to="/find" className="text-decoration-none">
                <p className="nav-link active text-warning" >
                  Find a Pet
                </p>
              </Link>

              <img
                className="mx-4 "
                src={Logo2}
                alt=""
                width="60"
                height="60"
              />
          </nav>
        </div>
      </nav>
      <main className="container">
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
      </main>
    </div>
  )
}