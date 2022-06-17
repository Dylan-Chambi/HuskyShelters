import React from "react";
//import useWindowSize from "./windowSize";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css"; // Import precompiled Bootstrap css
import "@fortawesome/fontawesome-free/css/all.css";
import "./styles.css";

const Layout: React.FC = () => {
  return (
    <div>
      <nav className="navbar bg-warning fixed-top">
        <div className="navbard-flex justify-content-between ">
          <h3>
            <img
              className="mr-3 "
              src="data:image/jpeg;base64,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"
              alt=""
              width="48"
              height="48"
            />
            Husky Shelters
          </h3>
        </div>
        <a className="navbar-brand justify-content-between" href="/#">
          <a className="navbar-brand" href="/#">
            <nav className="nav nav-underline">
              <a className="nav-link active " href="/#">
                Contactanos
              </a>
              <a className="nav-link active" href="/#">
                Acerca de nosotros
              </a>
              <a className="nav-link active" href="/#">
                Contactos
              </a>
            </nav>
          </a>
        </a>
      </nav>

      <main role="main" className="bg-warning">
        <div className=" my-3 p-3"></div>
        <div className="d-flex justify-content-center">
          <div>
            <div className="text d-flex ">
              <div className="text-center font-weight-bold">
                <h1>PET</h1>
                <h1>ADOPTION</h1>
                <h1>ROCKS! </h1>
                <div className="text-middle font-weight-normal">
                  <h3> Adopt true love</h3>
                  <h3> from shelters, rescues</h3>
                  <h3> & private owners!</h3>
                </div>
                <div className="col-md-12 text-center">
                  <button type="button" className="btn btn-dark">
                    Adopt Here!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              className="rounded float-end"
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3017d4d2-d9ed-46e2-9cab-6e35f053b458/db0lgx1-ffc0f380-bb1c-4c92-88cf-e6621ef9e427.png/v1/fill/w_800,h_832,strp/dog_and_cat_png_by_dalidas_art_db0lgx1-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODMyIiwicGF0aCI6IlwvZlwvMzAxN2Q0ZDItZDllZC00NmUyLTljYWItNmUzNWYwNTNiNDU4XC9kYjBsZ3gxLWZmYzBmMzgwLWJiMWMtNGM5Mi04OGNmLWU2NjIxZWY5ZTQyNy5wbmciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.y3hT_4CCfHt9EzHICQU-p8MWZOTeg2ZmjkxVFnc6pYM"
              alt=""
              width="500"
              height="500"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
