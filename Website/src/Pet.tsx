import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./logo.png";
import Logo2 from "./logo2.png";
import Dog1 from "./dog1.jpg";
import axios from "axios";
const Pet = () => {
    const location = useLocation();

    const [animal, setAnimal] = React.useState<any>({});
    React.useEffect(() => {
        const pet: any = location.state;
        setAnimal(pet.petAnimal);
        console.log(pet);
    }, [location]);


    const [animalCollection, setAnimalCollection] = React.useState<Array<any>>([]);
    React.useEffect(() => {
        axios.get("https://ue1spf4hoa.execute-api.us-east-1.amazonaws.com/aws/get-images/" + animal.id).then(res => {
            setAnimalCollection(res.data);
            console.log(res.data);

        }).catch(err => {
            console.log(err);
        });
    }, [animal]);



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
                <div className=" my-3 p-3"></div>
                <div className=" my-3 p-3"></div>
                <h1 className="text-center font-weight-bold"> Hi my Name is {animal.name} </h1>
                <div className="row d-flex justify-content-around my-3 p-3">
                    <div className="card bg-dark card-center my-2 p-2" style={{ width: '20rem', height: '20rem' }}>
                        <img src={Dog1} className="card-img-top" alt="dog1"  ></img>
                    </div>
                    <div className="card bg-dark card-center" style={{ width: '60rem', height: '20rem' }}>
                        <h1 className="text-warning">Facts</h1>
                        <h1 className="text-warning">about me!</h1>
                        <h1 className="text-warning">----------------------</h1>
                        <h4 className="text-light font-weight-bold">HEALTH STATUS:   {animal.health}</h4>
                        <h4 className="text-light font-weight-bold">AGE:   {animal.age}</h4>
                        <h4 className="text-light font-weight-bold">LOCATION:   {animal.location}</h4>
                        <h1 className="text-warning">----------------------</h1>
                    </div>
                </div>
                <h2 className="p-4 font-weight-bold">More about me...</h2>
                <div className="row d-flex justify-content-around my-3 p-3">


                    {animalCollection.map((photo: any) => {

                        return (
                            <div className="card bg-dark card-center my-3 p-3" style={{ width: '20rem', height: '20rem' }}>
                                <img src={photo} className="card-img-top" alt="dog2"  ></img>
                            </div>





                        )
                    })}
                   

                </div>
                <div className="row d-flex justify-content-around my-3 p-3">
                    <Link to="/edit" state={{animal: animal}}>
                        <button type="button" className="btn btn-dark btn-lg">
                            EDIT INFORMATION!
                        </button>
                    </Link>
                    <Link to="/">
                        <button type="button" className="btn btn-dark btn-lg">
                            CONTACT US!
                        </button>
                    </Link>
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
export default Pet;