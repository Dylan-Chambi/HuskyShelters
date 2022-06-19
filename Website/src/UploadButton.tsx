import React, { useRef } from "react";

function UploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };
  return (
    <div className="m-3">
      <input ref={inputRef} className="d-none bg-black" type="file" multiple />
      <button onClick={handleUpload} className="btn btn-dark text-light btn-outline-dark bg-black">
        Choose File
      </button>
    </div>
  );
}

export default UploadButton;