import * as React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import Logo2 from "./logo2.png";
import Dogs from "./dogs.png";
import Cats from "./cats.png";
const FindAPet = () => {
    return (
        <div className="bg-warning">
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
                <a className="navbar-brand justify-content-between" href="/#">
                    <a className="navbar-brand" href="/#">
                        <nav className="nav nav-underline">
                            <Link to="/">
                                <a className="nav-link active " href="/#">
                                    Home
                                </a>
                            </Link>
                            <Link to="/contact">
                                <a className="nav-link active " href="/#">
                                    Contact Us
                                </a>
                            </Link>

                            <Link to="/about">
                                <a className="nav-link active" href="/#">
                                    About Us
                                </a>
                            </Link>
                            <Link to="/rehome">
                                <a className="nav-link active" href="/#">
                                    Rehome a Pet
                                </a>
                            </Link>
                            <Link to="/find">
                                <a className="nav-link active" href="/#">
                                    Find a Pet
                                </a>
                            </Link>
                            <img
                            className="mr-3 "
                            src={Logo2}
                            alt=""
                            width="60"
                            height="60"
                        />
                        </nav>
                        
                    </a>
                </a>
                
            </nav>
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
        </div>
    );

}
export default FindAPet;