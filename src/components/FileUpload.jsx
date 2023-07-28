import { Button, TextField } from "@mui/material";
import { v4 } from "uuid";
import { PropTypes } from "prop-types";
import { useState } from "react";
import storage from "../storage.js";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ref , getDownloadURL} from "firebase/storage";

function FileUpload({ onUploadDone, uid }) {
  const [upload, loading, snapshot, error] = useUploadFile();
  const [file, setFile] = useState();

  const handleFileInputChange = (e) => {
    setFile(e.target?.files?.[0]);
  };

  async function handleUploadFile() {
    const fileRef = ref(storage, `${uid}/${v4()}`);
    const result = await upload(fileRef, file);
    const url = await getDownloadURL(result.ref);
    setFile(null);
    onUploadDone(url);
  }

  return (
    <>
      <TextField type="file" onChange={handleFileInputChange} />

      <Button disabled={!file || loading} onClick={handleUploadFile}>
        Upload
      </Button>

    </>
  );
}

FileUpload.propTypes = {
  onUploadDone: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

export default FileUpload;
