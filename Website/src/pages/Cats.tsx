import * as React from "react";
import { Link } from "react-router-dom";
import Dog2 from "../images/dog2.png";
import axios from "axios";

const Cats = () => {
    const [petAnimals, setCats] = React.useState<Array<any>>([]);
    React.useEffect(() => {
        axios.get("https://ue1spf4hoa.execute-api.us-east-1.amazonaws.com/aws/get-table-items").then(res => {
            setCats(res.data);

        }).catch(err => {
            console.log(err);
        });
    }, []);
    return (
        <main role="main" className="bg-warning">
            <div className=" my-3 p-3"></div>
            <div className=" my-3 p-3"></div>
            <h1 className="text-center"> OUR LOVELY CATS! </h1>
            <div className="row d-flex justify-content-around my-5 p-5">
                {petAnimals.filter((cat: any) => {
                    return cat.type === "Cat";
                }).map((petAnimal: any, index: number) => {

                    return (
                        <div className="card bg-dark " key={index} style={{ width: '12rem', height: '18rem' }}>
                            <img src={Dog2} className="card-img-top" alt="petAnimal2"  ></img>

                            <div className="card-body">
                                <h5 className="card-title text-center text-light">{petAnimal.name}</h5>
                                <Link to="/pet" state={{ petAnimal: petAnimal }}>
                                    <p className="btn btn-warning text-dark">ADOPT NOW!</p>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className=" my-3 p-3"></div>
            <div className=" my-3 p-3"></div>
            <div className=" my-3 p-3"></div>
            <div className=" my-3 p-3"></div>
            <div className=" my-3 p-3"></div>
            <div className=" my-1 p-1"></div>
        </main>
    );

}
export default Cats;