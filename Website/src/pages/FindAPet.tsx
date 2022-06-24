import * as React from "react";
import { Link } from "react-router-dom";
import Dogs from "../images/dogs.png";
import Cats from "../images/cats.png";
const FindAPet = () => {
    return (
        <main role="main" className="bg-warning">
            <div className=" my-3 p-3"></div>
            <div className=" my-3 p-3"></div>
            <div className=" my-3 p-3"></div>
            <div className="d-flex justify-content-around">
                <Link to="/dogs">
                    <button type="button" className="btn btn-dark">
                        <img
                            className="rounded float-end"
                            src={Dogs}
                            alt=""
                            width="350"
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
                            width="350"
                            height="250"
                        />
                        <p className="font-weight-bold"> CATS</p>
                    </button>
                </Link>

            </div>

            <div className=" my-5 p-5"></div>
            <div className=" my-5 p-5"></div>
            <div className=" my-1 p-1"></div>
            <div className=" my-1 p-1"></div>
        </main>
    );

}
export default FindAPet;