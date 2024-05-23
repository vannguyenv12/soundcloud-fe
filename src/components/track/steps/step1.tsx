"use client";
import { useDropzone, FileWithPath } from "react-dropzone";
import "./theme.scss";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCallback, useState } from "react";
import { sendRequest, sendRequestFile } from "@/utils/api";
import { useSession } from "next-auth/react";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      onClick={(e) => e.preventDefault()}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}

interface IProps {
  setValue: (n: number) => void;
  setTrackUpload: any;
}

const Step1 = (props: IProps) => {
  const { data: session } = useSession();

  const onDrop = useCallback(
    async (files: FileWithPath[]) => {
      if (files && files[0]) {
        props.setValue(1);
        const audio = files[0];
        const formData = new FormData();
        formData.append("file", audio);

        try {
          const res = await axios.post(
            "http://localhost:5000/api/v1/tracks/upload",
            formData,
            {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
              },
              onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.floor(
                  (progressEvent.loaded * 100) / progressEvent.total!
                );
                props.setTrackUpload({
                  fileName: files[0].name,
                  percent: percentCompleted,
                });
              },
            }
          );

          console.log(">>> check res", res);
        } catch (error) {
          console.log("Failed to upload track", error);
        }
      }
    },
    [session]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      audio: [".mp3"],
    },
  });

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <InputFileUpload />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default Step1;
