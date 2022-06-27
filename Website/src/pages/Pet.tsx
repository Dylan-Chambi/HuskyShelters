import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Dog1 from "../images/dog1.jpg";
import axios from "axios";
import FileUploader from "../components/fileUploader/fileUploader";
import { PetType } from "../schemas/animalDynamoDB";
import { Button } from "@mui/material";

const delay = (ms?: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

const Pet = () => {
    const location = useLocation();
    const [animal, setAnimal] = useState<PetType | null>(null);
    const [file, setFile] = useState<Blob | null>(null);
    const [isFile, setIsFile] = useState(false);
    const [reload, setReload] = useState(false);
    const [animalCollection, setAnimalCollection] = React.useState<Array<any>>([]);

    
    useEffect(() => {
        const pet: any = location.state;
        setAnimal(pet.animal as PetType);
    }, [location]);


    useEffect(() => {
        if (animal) {
            axios.get(process.env.REACT_APP_GET_IMAGES_BY_ID! + animal.id).then(res => {
                setAnimalCollection(res.data);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [animal, reload]);

    const onClickUpload = async () => {
        await axios.get(process.env.REACT_APP_GET_UPLOAD_IMAGE_BY_ID! + animal!.id).then(res => {
            console.log(res);
            fetch(res.data.uploadURL, {
                method: 'PUT',
                body: file
            }).then(res => {
                console.log(res);
            });
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
        <>
        {animal ?
        <main role="main" className="bg-warning">
            <h1 className="text-center font-weight-bold mt-5"> Hi my Name is {animal.name} </h1>
            <div className="row d-flex justify-content-around my-3 p-3">
                <div className="card bg-dark card-center my-3 p-3" style={{ width: '20rem', height: '20rem' }}>
                    <img src={animal.thumbnail} className="card-img-top" style={{ width: '18rem', height: '18rem' }} alt="dog1"  ></img>
                </div>
                <div className="card bg-dark card-center my-3 p-3" style={{ width: '60rem', height: '20rem' }}>
                    <h2 className="text-warning">Facts</h2>
                    <h2 className="text-warning">about me!</h2>
                    <h3 className="text-warning">----------------------</h3>
                    <h5 className="text-light font-weight-bold">HEALTH STATUS:   {animal.health}</h5>
                    <h5 className="text-light font-weight-bold">AGE:   {animal.age}</h5>
                    <h5 className="text-light font-weight-bold">LOCATION:   {animal.location}</h5>
                    <h5 className="text-light font-weight-bold">STATUS:   {animal.status}</h5>
                    <h3 className="text-warning">----------------------</h3>
                </div>
            </div>
            <h2 className="p-4 font-weight-bold">More about me...</h2>
            <div className="row d-flex justify-content-around my-3 p-3">


                {animalCollection.map((photo: any, index: number) => {

                    return (
                        <div className="card bg-dark card-center my-3 p-3 mx-3" key={index} style={{ width: '20rem', height: '20rem' }}>
                            <img src={photo} className="card-img-top" alt="dog2" style={{ height: "100%", width: "100%" }}></img>
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
            <div className="container bg-yellow mb-5">
        <div className="col-md-12 text-center">
                <Link to="/edit" state={{ animal: animal }}>
                    <button type="button" className="btn btn-dark btn-lg mx-5">
                        EDIT INFORMATION!
                    </button>
                </Link>
                </div>
    </div>

        </main> : <div>Error: Animal not found</div>}
        </>
    );

}
export default Pet;