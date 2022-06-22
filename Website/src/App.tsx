import axios from 'axios';
import React from 'react';
import { useRef } from 'react';
import './App.css';


function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  }
  const onClick = async () => {
    if (file) {
      await axios.get("https://ue1spf4hoa.execute-api.us-east-1.amazonaws.com/aws/upload-image/11").then(async res => {
        console.log(res);
        fetch(res.data.uploadURL, {
          method: 'PUT',
          body: file
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      });
    }
  }

  return (
    <div className="m-3 bg-black" style={{ alignItems: 'center' }}>
      <input ref={inputRef} className="d-none bg-black" type="file" multiple onChange={onChange} />
      <button onClick={onClick} className="btn btn-outline-dark bg-black">
        Upload
      </button>
    </div>
  );
}

export default App;