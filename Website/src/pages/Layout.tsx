import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
const Layout: React.FC = () => {
  return (
    <main role="main" className="bg-warning">
      <div className=" my-3 p-3"></div>
      <div className="d-flex justify-content-center">
        <div>
          <div className="text d-flex mt-5">
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
                <Link to="/find">
                  <button type="button" className="btn btn-dark">
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
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3017d4d2-d9ed-46e2-9cab-6e35f053b458/db0lgx1-ffc0f380-bb1c-4c92-88cf-e6621ef9e427.png/v1/fill/w_800,h_832,strp/dog_and_cat_png_by_dalidas_art_db0lgx1-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODMyIiwicGF0aCI6IlwvZlwvMzAxN2Q0ZDItZDllZC00NmUyLTljYWItNmUzNWYwNTNiNDU4XC9kYjBsZ3gxLWZmYzBmMzgwLWJiMWMtNGM5Mi04OGNmLWU2NjIxZWY5ZTQyNy5wbmciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.y3hT_4CCfHt9EzHICQU-p8MWZOTeg2ZmjkxVFnc6pYM"
            alt=""
            width="500"
            height="500"
          />
        </div>
      </div>
      <div className=" my-5 p-5"></div>
      <div className=" my-1 p-1"></div>
    </main>
  );
};

export default Layout;
