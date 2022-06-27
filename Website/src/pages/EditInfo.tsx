import { FormLabel, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import * as React from "react";
import { Theme, useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PetType } from "../schemas/animalDynamoDB";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { locationOptions, healthOptions, statusOptions } from "../schemas/animalDynamoDB";
import { style } from "@mui/system";

const EditInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [petInfo, setPetInfo] = useState<PetType | null>(null);
    useEffect(() => {
        const state: any = location.state;
        setPetInfo(state.animal as PetType);
    }, [location]);

    const { register, setValue, handleSubmit, formState: { errors }, getValues } = useForm<PetType>();

    const saveChanges: SubmitHandler<PetType> = (petData) => {
        console.log(petData);
        const newPetData = JSON.stringify({
            id: petInfo!.id,
            age: petData.age === "" ? petInfo!.age : petData.age,
            health: petData.health === "" ? petInfo!.health : petData.health,
            location: petData.location === "" ? petInfo!.location : petData.location,
            name: petData.name === "" ? petInfo!.name : petData.name,
            status: petData.status === "" ? petInfo!.status : petData.status,
        });
        console.log(newPetData);
        fetch(process.env.REACT_APP_POST_UPDATE_ITEM!, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            method: "POST",
            mode: "no-cors",
            body: newPetData
        }).then(res => {
            console.log(res);
            navigate("/pet", {
                state: {
                    animal: { ...petData, id: petInfo!.id, type: petInfo!.type, status: petInfo!.status, thumbnail: petInfo!.thumbnail }
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
                                <img src={petInfo.thumbnail} className="card-img-top" alt="dog1"  ></img>
                            </div>
                            <div>
                                <div className="input-group p-3 mx-auto w-500">
                                    <Box className="input-group-prepend">
                                        <Typography className="input-group-text bg-dark text-light border-0" >Name</Typography>
                                    </Box>
                                    <TextField type="text" className="form-control bg-dark text-light" size="small" {...register("name")} placeholder={petInfo.name} sx={{ input: { color: "white", width: "400px" } }} />
                                </div>

                                <div className="input-group p-3 mx-auto">
                                    <Box className="input-group-prepend">
                                        <Typography className="input-group-text bg-dark text-light border-0" >Health Status</Typography>
                                    </Box>
                                    <TextField
                                        select
                                        className="form-control bg-dark text-light"
                                        size="small"
                                        defaultValue={petInfo.health}
                                        sx={{ input: { color: "white" } }}
                                        {...register("health")}
                                    >
                                        {healthOptions.map((health, index) => {
                                            return <MenuItem key={index} value={health}>{health}</MenuItem>
                                        })}
                                    </TextField>
                                </div>
                                <div className="input-group mb-3 p-3 mx-auto">
                                    <Box className="input-group-prepend">
                                        <Typography className="input-group-text bg-dark text-light border-0" >Status</Typography>
                                    </Box>
                                    <TextField
                                        select
                                        className="form-control bg-dark text-light"
                                        size="small"
                                        defaultValue={petInfo.status}
                                        sx={{ input: { color: "white" } }}
                                        {...register("status")}
                                    >
                                        {statusOptions.map((status, index) => {
                                            return <MenuItem key={index} value={status}>{status}</MenuItem>
                                        }
                                        )}
                                    </TextField>
                                </div>

                                <div className="input-group mb-3 p-3 mx-auto">
                                    <Box className="input-group-prepend">
                                        <Typography className="input-group-text bg-dark text-light border-0" >Age</Typography>
                                    </Box>
                                    <TextField 
                                    type="number" 
                                    InputProps={{ inputProps: { min: 0, max: 20 } }}
                                    className="form-control bg-dark text-light" size="small" {...register("age")} placeholder={petInfo.age} sx={{ input: { color: "white" } }} />
                                </div>

                                <div className="input-group mb-3 p-3 mx-auto">
                                    <Box className="input-group-prepend">
                                        <Typography className="input-group-text bg-dark text-light border-0" >Location</Typography>
                                    </Box>
                                    <TextField
                                        select
                                        className="form-control bg-dark text-light"
                                        size="small"
                                        defaultValue={petInfo.location}
                                        sx={{ input: { color: "white" } }}
                                        {...register("location")}
                                    >
                                        {locationOptions.map((location, index) => {
                                            return <MenuItem key={index} value={location}>{location}</MenuItem>
                                        }
                                        )}
                                    </TextField>
                                </div>
                            </div>
                        </Box>

                    </div>
                    <div className="row d-flex justify-content-around my-1 p-4">
                        <button type="submit" className="btn btn-dark btn-lg" onClick={handleSubmit(saveChanges)}>
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