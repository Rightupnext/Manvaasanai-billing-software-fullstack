import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from './Uploader.module.css';
import { Grid, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles({
  root: {
    height: 5,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#e0e0e0",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#008d3f",
  },
})(LinearProgress);

export default function Uploader({ form, setForm }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (file) {
      setForm({ ...form, logo: file });
    }
  }, [file]);
  const user = JSON.parse(localStorage.getItem('profile'))
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImagePreview(URL.createObjectURL(file)); // Set image preview
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user?.result._id);
  
    try {
      const response = await fetch("http://localhost:5000/profiles/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      setFile(data.fileId); // Store GridFS file ID
      setProgress(100);
      console.log("Uploaded file ID:", data.fileId);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }, []);
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*,application/pdf",
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}
      >
        <input {...getInputProps()} />
        Upload Logo
      </div>
      <Grid item style={{ width: '100%' }}>
        <BorderLinearProgress variant="determinate" value={progress} />
        {imagePreview && (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <img
          src={imagePreview}
          alt="Logo Preview"
          style={{
            width: '150px',
            height: '120px',
            borderRadius: '50%',
            objectFit: 'cover',
           marginLeft:"150px"
          }}
        />
      </div>
    )}
      </Grid>
    </>
  );
}
