import { Button, Typography } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
//styles
import './fileUploader.css';

const acceptedInput = "jpg, jpeg, png"

type Props = {
    file: Blob | null,
    setFile: (file: Blob | null) => void,
    onUpload: (file: Blob) => void
}


const FileUploader: React.FC<Props> = ({ file, setFile, onUpload }) => {
    const dragDropArea = useRef<HTMLInputElement>(null);
    const inputFile = useRef<HTMLInputElement>(null);
    const [fileCase, setFileCase] = useState(-1);

    const isValidFileRequirements = (filesArray: FileList) => {
        const validFilesLength = (filesArray.length === 1);

        if (validFilesLength) {
            let extText: string = "";
            let ext: RegExpMatchArray | null = filesArray[0].name.match(/\.([^.]+)$/);                    // get extension of file
            if (ext != null) extText = ext[0];                                                            // null for files without extension
            const validFileType = acceptedInput.split(', ').includes(extText);     // check if extension is valid
            if (validFileType) {
                setFileCase(3);                                                   // case 3: file is valid
                return true;
            } else setFileCase(1);                                                // case 1: not valid file type
            
            setFileCase(3);                                                        // Accept all files
            return true;

        } else setFileCase(0)                                                     // case 0: mutiple files selected
        return false;
    }

    const trySetFile = (filesArray: FileList) => {
        if (isValidFileRequirements(filesArray)) {
            setFile(filesArray[0]);
            onUpload(filesArray[0]);
        }
    }

    const fileCaseWarning = (numberCase: Number) => {
        switch (numberCase) {
            case 0:
                return <p>Only one image is allowed!!!</p>
            case 1:
                return <p>Only images are allowed!!!</p>;
            case 2:
                return <p>Upload an image to continue!!!</p>;
            default:
                return null;
        }
    }

    useEffect(() => {
        ['dragenter', 'dragover', 'dragleave'].forEach((eventName: string) => {
            dragDropArea.current?.addEventListener(eventName, (e: Event) => e.preventDefault(), false);
        });

        dragDropArea.current?.addEventListener('drop', (e: DragEvent) => {
            e.preventDefault();
            trySetFile(e.dataTransfer?.files!);
        });
        inputFile.current?.addEventListener('change', (e: Event) => {
            e.preventDefault();
            trySetFile((e.target as HTMLInputElement).files!);
        });
    }, [inputFile, dragDropArea]);

    return (
        <div className="fileUploader">
            <div className="drag-drop-area" ref={dragDropArea}>
                <form className="form-file" id="form-file">
                    <Typography style={{ color: "white", fontSize: "1.5rem", paddingTop:'8px' }} >Drag and drop</Typography>
                    <Typography style={{ color: "white", fontSize: "1rem", bottom: "10px", position: "relative", paddingTop:'6px' }} >an image to add it or</Typography>
                    <Button
                        variant="contained"
                        sx={{
                            width: "100%",
                            height: "40px",
                            fontSize: "11px",
                            fontWeight: "bold",
                            backgroundColor: "#FFC107",
                            border: "none",
                            borderRadius: "5px",
                            textTransform: "none",
                            padding: "26px 23px",
                            marginTop: "40px",
                            textAlign: "center",
                            lineHeight: "none",
                            ':hover': {
                                backgroundColor: '#735114'
                            }
                        }}
                        onClick={() => inputFile.current?.click()}
                        startIcon={<i className="demo-icon icon-fi-rr-folder" style={{ color: "white", fontSize: "20px" }} />}
                    >
                        <Typography style={{ color: "white", fontSize: "0.9rem" }} >Browse</Typography>
                    </Button>

                    <input
                        type="file"
                        ref={inputFile}
                        className="form-control" />
                </form>
                <div className="text-back">
                    {fileCaseWarning(fileCase)}
                </div>
            </div>
        </div>
    )
}

export default FileUploader;