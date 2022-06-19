import * as React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import UploadButton from "./UploadButton";
const RehomePet = () => {
    return (
        <div>
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
                                    Find A Pet
                                </a>
                            </Link>
                        </nav>
                    </a>
                </a>
            </nav>

            <main role="main" className="bg-warning">
                <div className=" my-3 p-3"></div>
                <div className="d-flex align-items-center flex-column" >
                    <h1 className="text-center">Rehome a pet</h1>
                    <p className="text-center">Are you looking for a new home for your pet? If so, you're in the right place! We are here to help you safely find a loving forever home for your pet. All you need to do is to set up your pet's information in less than 10 mins. Once complete, your pet's profile will be posted on Husky Shelters and be seen by millions of visitors each month!</p>
                    <div className=" row text-center justify-content-center">
                    <div className="col-12">
                    <h2>Are you rehoming a dog, cat or other pet?</h2>
                    
                    <div className="input-group mb-3 w-25 mx-auto">
                        <select className="custom-select bg-dark text-light text-center" id="inputGroupSelect01">
                            <option selected>Choose one</option>
                            <option value="1">DOG</option>
                            <option value="2">CAT</option>
                        </select>
                    </div>
                    <h2>How old is your Pet?</h2>
                    <div className="input-group mb-3 w-25 mx-auto">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-dark text-light text-center" id="inputGroup-sizing-default">Age</span>
                        </div>
                        <input type="text" className="form-control bg-dark text-light" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
                    </div>
                    
                    <h2>How is your Pet health Status?</h2>
                    <div className="input-group mb-3 w-25  mx-auto">
                        <select className="custom-select bg-dark text-light text-center" id="inputGroupSelect01">
                            <option selected>Choose one</option>
                            <option value="1">vaccinations up to date</option>
                            <option value="2">vaccines are missing</option>
                            <option value="3">does not have vaccines</option>
                        </select>
                    </div>
                    <h2>Where is your Pet actually?</h2>
                    <div className="input-group mb-3 w-25  mx-auto">
                        <select className="custom-select bg-dark text-light text-center" id="inputGroupSelect01">
                            <option selected>Choose a city</option>
                            <option value="1">La Paz</option>
                            <option value="2">Cochabamba</option>
                            <option value="3">Oruro</option>
                            <option value="4">Potosi</option>
                            <option value="5">Santa Cruz</option>
                            <option value="6">Tarija</option>
                            <option value="7">Sucre</option>
                            <option value="8">Pando</option>
                            <option value="9">Beni</option>
                        </select>
                    </div>
                    <h2>Please, upload images of your Pet!</h2>
                            <UploadButton />
                            <div className=" my-3 p-3"></div>
                            <p className="text-center">If you complete all the requirements, please press the button below.</p>
                    <Link to="/home">
                        
                    <button type="button" className="btn btn-dark  mx-auto text-center">
                      Submit
                    </button>
                  </Link>
                  <div className=" my-3 p-3"></div>
                </div>
                </div>
                </div>
                
            </main>
        </div>
    );

}
export default RehomePet;