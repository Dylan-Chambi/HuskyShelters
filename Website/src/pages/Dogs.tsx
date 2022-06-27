import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dog2 from "../images/dog2.png";
import axios from "axios";
import { PetType } from "../schemas/animalDynamoDB";

const Dogs = () => {
    const [petAnimals, setDogs] = useState<Array<PetType>>([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_GET_TABLE_ITEMS!).then(res => {
            setDogs(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <main role="main" className="bg-warning">
            <h1 className="text-center mt-5"> OUR LOVELY DOGS! </h1>
            <div className="row d-flex justify-content-around my-5 p-5">
                {petAnimals.filter((petAnimal: any) => {
                    return petAnimal.type === "Dog";
                }).map((petAnimal: PetType, index: number) => {

                    return (
                        <div className="card bg-dark mb-5 mx-5" key={index} style={{ width: '18rem', height: '24rem' }}>
                            <img src={petAnimal.thumbnail} className="card-img-top mx-3 mt-4 mb-3"  style={{ width: '15rem', height: '15rem' }} alt={petAnimal.name}></img>
                            <div className="card-body">
                                <h5 className="card-title text-center text-light">{petAnimal.name}</h5>
                                <Link to="/pet" state={{ animal: petAnimal }}>
                                    <p className="btn btn-warning text-dark mx-5">ADOPT NOW!</p>
                                </Link>
                            </div>
                        </div>


                    )
                })}
            </div>
        </main>
    );

}
export default Dogs;