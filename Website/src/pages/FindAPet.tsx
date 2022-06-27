import * as React from "react";
import { Link } from "react-router-dom";
import Dogs from "../images/dogs.png";
import Cats from "../images/cats.png";
const FindAPet = () => {
    return (
        <main role="main" className="bg-warning">
       <h1 className="text-center mt-5 mb-5">Find your new best friend...</h1>
            <div className="d-flex justify-content-around mt-5">
                <Link to="/dogs">
                    <button type="button" className="btn btn-dark">
                        <img
                            className="rounded float-end"
                            src={Dogs}
                            alt=""
                            width="300"
                            height="250"
                        />
                        <p className="font-weight-bold"> DOGS</p>
                    </button>
                </Link>


                <Link to="/cats">
                    <button type="button" className="btn btn-dark">
                        <img
                            className="rounded float-end"
                            src={Cats}
                            alt=""
                            width="300"
                            height="250"
                        />
                        <p className="font-weight-bold"> CATS</p>
                    </button>
                </Link>

            </div>

        </main>
    );

}
export default FindAPet;