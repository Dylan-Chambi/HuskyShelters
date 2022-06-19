import * as React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
const AboutUs = () => {
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
                            <Link to="/home">
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
                        </nav>
                    </a>
                </a>
            </nav>

            <main role="main" className="bg-warning">
                <div className=" my-3 p-3"></div>
                <div className="d-flex justify-content">
                    <div className="col-md-8 mt-3">
                        <div className="notes notes-center">
                            <h2> About Husky Shelters</h2>
                            <p>Petfinder is an online, searchable database of animals who need homes. It is also a directory of nearly 11,000 animal shelters and adoption organizations across Bolivia. Organizations maintain their own home pages and available-pet databases.</p>
                            <h3>Our mission </h3>
                            <p>To use Internet technology and the resources it can generate to:</p>
                            <p>1. Increase public awareness of the availability of high-quality adoptable pets</p>
                            <p>2. Increase the overall effectiveness of pet adoption programs across Bolivia to the extent that the euthanasia of adoptable pets is eliminated</p>
                            <p>3. Elevate the status of pets to that of family member</p>
                            <p>From the comfort of their personal computers, pet lovers can search for a pet that best matches their needs. They can then reference a shelter’s web page and discover what services it offers. Petfinder also includes discussion forums, a pet-care resource directory and a library of free pet-care articles to help keep pets in their homes.</p>
                            <p>Husky Shelters is updated DAILY.</p>
                            <h4>Disclaimer</h4>
                            <p>Husky Shelters is only a directory of homeless pets and pet adoption organizations. No information in Husky Shelters is guaranteed. Although the information on Husky Shelters is updated frequently, it is always best to call the facility or organization that lists the pet to insure it is still available and to insure the information listed in Husky Shelters is accurate. It is crucial that any pet found through an adoption service be thoroughly examined by a veterinarian immediately upon adoption. Any pets found, adopted through, or listed in Husky Shelters are the sole responsibility of the adoption organizations and/or the adopting party.</p>
                            <p>Husky Shelters accepts no responsiblity for any liability or for any injury or damages to any person or property caused by any listed animal, as well as any cause of action, claims, suits or demands whatsoever that may arise as a result of such injury or damage.</p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );

}
export default AboutUs;