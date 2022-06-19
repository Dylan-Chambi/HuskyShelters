import * as React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import Dog1 from "./dog1.jpg";
import Dog2 from "./dog2.png";
import axios from "axios";
const Dogs = () => {
    const [dogs, setDogs] = React.useState<Array<any>>([]);
    React.useEffect(() => {
    axios.get("https://k5dftj7nbh.execute-api.us-east-1.amazonaws.com/aws/get-table-items").then(res => {
        setDogs(res.data);
       
    }).catch(err => {
        console.log(err);
    });
    }, []);
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
                        </nav>
                    </a>
                </a>

            </nav>
            <main role="main" className="bg-warning">
                <div className=" my-3 p-3"></div>
                <div className=" my-3 p-3"></div>
                <h1 className="text-center"> OUR LOVELY DOGS! </h1>
                <div className="flex-row d-flex justify-content-around ">
                {dogs.filter((dog: any) => {
                    console.log(dog.type);
                    return dog.type === "Dog";
                }).map((dog: any) => {

                    return (
                        <div className="card bg-dark" style={{ width: '9rem', height: '18rem' }}>
                        <img src={Dog2} className="card-img-top" alt="dog2"  ></img>

                        <div className="card-body">
                            <h5 className="card-title text-center text-light">{dog.name}</h5>
                            <a href="#" className="btn btn-warning text-dark">ADOPT NOW!</a>
                        </div>
                    </div>
                   

                )})}
                </div>
                <div className=" my-3 p-3"></div>
                <div className=" my-3 p-3"></div>
                <div className=" my-3 p-3"></div>
                <div className=" my-3 p-3"></div>
                <div className=" my-3 p-3"></div>
                <div className=" my-1 p-1"></div>
            </main>
        </div>
    );

}
export default Dogs;