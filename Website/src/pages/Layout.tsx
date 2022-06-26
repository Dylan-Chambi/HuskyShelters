import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import PerroGato from "../images/dog_and_cat.png";
const Layout: React.FC = () => {
  return (
    <main role="main" className="bg-warning">
      <div className="d-flex justify-content-center mt-5">
          <div className="text d-flex mt-5">
            <div className="text-center font-weight-bold">
              <h1>PET</h1>
              <h1>ADOPTION</h1>
              <h1>ROCKS! </h1>
              <div className="text-middle font-weight-normal">
                <h3> Adopt true love</h3>
                <h3> from shelters, rescues</h3>
                <h3> & private owners!</h3>
              
              <div className="col-md-12 text-center">
                <Link to="/find">
                  <button type="button" className="btn btn-dark mt-2">
                    Adopt Here!
                  </button>
                </Link>
              </div>
              </div>
            </div>
          </div>
        <div>
          <img
            className="rounded float-end"
            src={PerroGato}
            alt=""
            width="500"
            height="500"
          />
        </div>
      </div>
    </main>
  );
};

export default Layout;
