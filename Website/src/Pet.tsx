import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Dog1 from "./dog1.jpg";
import axios from "axios";
import FileUploader from "./components/fileUploader/fileUploader";
import { Button } from "@mui/material";

const delay = (ms?: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

const Pet = () => {
    const location = useLocation();
    const [animal, setAnimal] = useState<any>({});
    const [file, setFile] = useState<Blob | null>(null);
    const [isFile, setIsFile] = useState(false);
    const [reload, setReload] = useState(false);
    const [animalCollection, setAnimalCollection] = React.useState<Array<any>>([]);

    
    useEffect(() => {
        const pet: any = location.state;
        setAnimal(pet.petAnimal);
    }, [location]);


    useEffect(() => {
        if (Object.keys(animal).includes("id")) {
            axios.get("https://ue1spf4hoa.execute-api.us-east-1.amazonaws.com/aws/get-images/" + animal.id).then(res => {
                setAnimalCollection(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [animal]);

    const onClickUpload = async () => {
        await axios.get("https://ue1spf4hoa.execute-api.us-east-1.amazonaws.com/aws/upload-image/" + animal.id).then(res => {
            console.log(res);
            fetch(res.data.uploadURL, {
                method: 'PUT',
                body: file
            }).then(res => {
                console.log(res);
            })
        }).catch(err => {
            console.log(err);
        });
        await setIsFile(false);
        await setFile(null);
        await delay(4000);
        await setReload(!reload);
    }

    const onClickCancel = async () => {
        await setIsFile(false);
        await setFile(null);
    }


    return (
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


                {animalCollection.map((photo: any, index: number) => {

                    return (
                        <div className="card bg-dark card-center my-3 p-3" key={index} style={{ width: '20rem', height: '20rem' }}>
                            <img src={photo} className="card-img-top" alt="dog2"></img>
                        </div>
                    )
                })}
                <div className="card bg-dark card-center my-3 p-3" style={{ width: '20rem', height: '20rem' }}>
                    <>
                        {!isFile && <FileUploader file={file} setFile={setFile} onUpload={() => setIsFile(true)} />}
                        {isFile &&
                            <>
                                <img src={URL.createObjectURL(file! as Blob)} className="card-img-top" alt="dog2"
                                    style={{ maxWidth: '100%', maxHeight: '100%', height: "100%", width: "100%" }}>
                                </img>
                                <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', top: "105%", alignSelf: 'center', width: '100%' }}>
                                    <Button onClick={onClickCancel}
                                        sx={{ position: 'relative', color: 'white', backgroundColor: '#343a40', ':hover': { backgroundColor: '#735114' } }}>
                                        Cancel
                                    </Button>
                                    <div style={{ width: '30px' }} />
                                    <Button onClick={onClickUpload}
                                        sx={{ position: 'relative', color: 'white', backgroundColor: '#343a40', ':hover': { backgroundColor: '#735114' } }}>
                                        Upload
                                    </Button>
                                </div>
                            </>}
                    </>
                </div>
            </div>
            <div className="row d-flex justify-content-around my-3 p-3">
                <Link to="/edit" state={{ animal: animal }}>
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
    );

}
export default Pet;