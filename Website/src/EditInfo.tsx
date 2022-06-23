import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./logo.png";
import Logo2 from "./logo2.png";
import Dog1 from "./dog1.jpg";
import axios from "axios";
const EditInfo = () => {
    const location = useLocation();

    const [animal2, setAnimal2] = React.useState<any>({});
    React.useEffect(() => {
        const pet: any = location.state;
        setAnimal2(pet.animal);
        console.log(pet);
    }, [location]);
    const [petName, setPetName] = React.useState("");

const saveChanges=()=>{
    console.log(petName);
    console.log(animal2.id);
    axios.post("https://ue1spf4hoa.execute-api.us-east-1.amazonaws.com/aws/update-item", {
        headers:{ 
            "Content-Type": "application/json", 
            "Host": "192.168.1.212:3000",
            "Content-Length": "0",
            "Access-Control-Allow-Origin": "*"
    },
    body:{
        "id": animal2.id,
        "name": petName
    }}).then(res => {
        
        alert("Changes saved");
        
    }).catch(err => {
        console.log(err);
        alert("Error");
    });}


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
                <div className=" my-4 p-3 mx-auto">
               
                    <h1 className="text-center">EDIT YOUR PET INFORMATION!</h1>

                    <div className="input-group mb-3 w-50 mt-5 p-3 mx-auto">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-dark text-light" id="basic-addon1">Name</span>
                        </div>
                        <input type="text" className="form-control bg-dark text-light" placeholder={animal2.name} aria-label="name" aria-describedby="basic-addon1" onChange={(e) => setPetName(e.target.value)} />
                       
                    </div>

                    <div className="input-group mb-3 w-50 p-3 mx-auto">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-dark text-light" id="basic-addon1">Health Status</span>
                        </div>
                        <input type="text" className="form-control bg-dark text-light" placeholder={animal2.health} aria-label="name" aria-describedby="basic-addon1">
                        </input>
                    </div>

                    <div className="input-group mb-3 w-50 p-3 mx-auto">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-dark text-light" id="basic-addon1">Age</span>
                        </div>
                        <input type="text" className="form-control bg-dark text-light" placeholder={animal2.age} aria-label="name" aria-describedby="basic-addon1">
                        </input>
                    </div>

                    <div className="input-group mb-3 w-50 p-3 mx-auto">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-dark text-light" id="basic-addon1">Location</span>
                        </div>
                        <input type="text" className="form-control bg-dark text-light" placeholder={animal2.location} aria-label="name" aria-describedby="basic-addon1">
                        </input>
                        </div> 
                        <div className="card bg-dark card-center my-2 p-2 mx-auto" style={{ width: '20rem', height: '20rem' }}>
                        <img src={Dog1} className="card-img-top" alt="dog1"  ></img>
                    </div>
                </div>
                <div className="row d-flex justify-content-around my-1 p-4">
                    <Link to="/">
                        <button type="button" className="btn btn-dark btn-lg" onClick={saveChanges}>
                            SAVE
                        </button>
                    </Link>
                    <Link to="/">
                        <button type="button" className="btn btn-dark btn-lg">
                            CANCEL
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    );

}
export default EditInfo;