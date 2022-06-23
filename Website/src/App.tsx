import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
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
import Logo from "./logo.png";
import Logo2 from "./logo2.png";

// Import precompiled Bootstrap css
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default function App() {
  return (
    <div className="bg-warning ">
      <nav className="navbar bg-warning fixed-top">
        <div className="navbard-flex justify-content-between ">
          <h3>
            <img
              className="mr-3 "
              src={Logo}
              alt=""
              width="48"
              height="48"
            />
            Husky Shelters
          </h3>
        </div>
        <div className="navbar-brand justify-content-between" >
          <nav className="nav nav-underline">
              <Link to="/">
                <p className="nav-link active ">
                  Home
                </p>
              </Link>
              <Link to="/contact">
              <p className="nav-link active ">
                  Contact Us
                </p>
              </Link>

              <Link to="/about">
                <p className="nav-link active">
                  About Us
                </p>
              </Link>
              <Link to="/rehome">
                <p className="nav-link active" >
                  Rehome a Pet
                </p>
              </Link>
              <Link to="/find">
                <p className="nav-link active" >
                  Find a Pet
                </p>
              </Link>

              <img
                className="mr-3 "
                src={Logo2}
                alt=""
                width="60"
                height="60"
              />
          </nav>
        </div>
      </nav>
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
    </div>
  )
}