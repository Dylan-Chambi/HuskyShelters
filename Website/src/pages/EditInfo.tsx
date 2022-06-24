import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hooks-useform";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Dog1 from "../images/dog1.jpg";
import { PetType } from "../schemas/animalDynamoDB";

const EditInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [petInfo, setPetInfo] = useState<PetType | null>(null);
    useEffect(() => {
        const state: any = location.state;
        setPetInfo(state.animal as PetType);
    }, [location]);

    const [fields] = useForm({
        fields: [
            { name: "name", value: petInfo?.name || "" },
            { name: "age", value: petInfo?.age || "" },
            { name: "type", value: petInfo?.type || "" },
            { name: "location", value: petInfo?.location || "" },
            { name: "status", value: petInfo?.status || "" },
            { name: "health", value: petInfo?.health || "" },
        ],
        submit: (data) => new Promise(() => { }),
    });

    const saveChanges = () => {
        fetch("https://ue1spf4hoa.execute-api.us-east-1.amazonaws.com/aws/update-item", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                "id": petInfo!.id,
                "name": fields.name.value === "" ? petInfo!.name : fields.name.value,
                "health": fields.health.value === "" ? petInfo!.health : fields.health.value,
                "age": fields.age.value === "" ? petInfo!.age : fields.age.value,
                "location": fields.location.value === "" ? petInfo!.location : fields.location.value
            })
        }).then(res => {
            navigate("/pet", {
                state: {
                    animal: {
                        id: petInfo!.id,
                        name: fields.name.value === "" ? petInfo!.name : fields.name.value,
                        health: fields.health.value === "" ? petInfo!.health : fields.health.value,
                        age: fields.age.value === "" ? petInfo!.age : fields.age.value,
                        location: fields.location.value === "" ? petInfo!.location : fields.location.value,
                        type: petInfo!.type,
                        status: petInfo!.status
                    }
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }


    return (
        <>
            {petInfo ?
                <div>
                    <div className=" my-4 p-3 mx-auto">
                        <h1 className="text-center">EDIT YOUR PET INFORMATION!</h1>
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                            <div className="card bg-dark card-center my-2 p-2 " style={{ width: '20rem', height: '20rem' }}>
                                <img src={Dog1} className="card-img-top" alt="dog1"  ></img>
                            </div>
                            <div>
                                <div className="input-group p-3 mx-auto w-500">
                                    <Box className="input-group-prepend">
                                        <Typography className="input-group-text bg-dark text-light border-0" >Name</Typography>
                                    </Box>
                                    <TextField type="text" className="form-control bg-dark text-light" size="small" {...fields.name} placeholder={petInfo.name} sx={{ input: { color: "white", width: "400px" } }} />
                                </div>

                                <div className="input-group p-3 mx-auto">
                                    <Box className="input-group-prepend">
                                        <Typography className="input-group-text bg-dark text-light border-0" >Health Status</Typography>
                                    </Box>
                                    <TextField type="text" className="form-control bg-dark text-light" size="small" {...fields.health} placeholder={petInfo.health} sx={{ input: { color: "white" } }} />
                                </div>

                                <div className="input-group mb-3 p-3 mx-auto">
                                    <Box className="input-group-prepend">
                                        <Typography className="input-group-text bg-dark text-light border-0" >Age</Typography>
                                    </Box>
                                    <TextField type="text" className="form-control bg-dark text-light" size="small" {...fields.age} placeholder={petInfo.age} sx={{ input: { color: "white" } }} />
                                </div>

                                <div className="input-group mb-3 p-3 mx-auto">
                                    <Box className="input-group-prepend">
                                        <Typography className="input-group-text bg-dark text-light border-0" >Location</Typography>
                                    </Box>
                                    <TextField type="text" className="form-control bg-dark text-light" size="small" {...fields.location} placeholder={petInfo.location} sx={{ input: { color: "white" } }} />
                                </div>
                            </div>
                        </Box>

                    </div>
                    <div className="row d-flex justify-content-around my-1 p-4">
                        <button type="submit" className="btn btn-dark btn-lg" onClick={saveChanges}>
                            Save
                        </button>
                        <Link to="/pet" state={{ animal: petInfo }}>
                            <button type="button" className="btn btn-dark btn-lg">
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div> : <div>Error: Missing pet info</div>}
        </>
    );

}
export default EditInfo;