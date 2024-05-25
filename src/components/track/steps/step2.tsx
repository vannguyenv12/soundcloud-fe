"use client";

import { Box, Stack, Typography } from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import axios from "axios";
import { sendRequest } from "@/utils/api";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function LinearWithValueLabel(props: IProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={props.trackUpload.percent} />
    </Box>
  );
}

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

function InputFileUpload(props: any) {
  const { setInfo, info } = props;
  const { data: session } = useSession();

  const handleUpload = async (image: any) => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/tracks/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      setInfo({
        ...info,
        imgUrl: res.data.data,
      });
    } catch (error) {
      console.log("Failed to upload track", error);
    }
  };
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      onChange={(e) => {
        const event = e.target as HTMLInputElement;
        if (event.files) {
          handleUpload(event.files[0]);
        }
      }}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}

const categories = [
  {
    value: "Ballad",
    label: "Ballad",
  },
  {
    value: "Chill",
    label: "Chill",
  },
];

interface IProps {
  trackUpload: {
    fileName: string;
    percent: number;
    uploadedTrackName: string;
  };
  setValue?: (n: number) => void;
}

interface INewTrack {
  title: string;
  description: string;
  trackUrl: string;
  imgUrl: string;
  category: string;
}

const Step2 = (props: IProps) => {
  const { data: session } = useSession();
  const [info, setInfo] = useState<INewTrack>({
    title: "",
    description: "",
    trackUrl: "",
    imgUrl: "",
    category: "",
  });

  const { trackUpload } = props;

  useEffect(() => {
    if (trackUpload && trackUpload.uploadedTrackName) {
      setInfo({
        ...info,
        trackUrl: trackUpload.uploadedTrackName,
      });
    }
  }, [trackUpload]);

  const handleSubmit = async () => {
    console.log("check info", info);
    const res = await sendRequest<IBackendRes<ITrackTop[]>>({
      url: "http://localhost:5000/api/v1/tracks",
      method: "POST",
      body: info,
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res.data) {
      alert("create success");
      props.setValue?.(0);
    } else {
      alert("cannot add track");
    }
  };
  return (
    <Box>
      <Box>
        <Typography>{trackUpload.fileName}</Typography>
        <div>
          <LinearWithValueLabel trackUpload={trackUpload} />
        </div>
      </Box>
      <Stack direction="row" sx={{ marginTop: 4 }}>
        <Box>
          <div
            style={{ width: "300px", height: "300px", backgroundColor: "#ccc" }}
          >
            {info.imgUrl && (
              <img
                height={"100%"}
                width={"100%"}
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${info.imgUrl}`}
              />
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <InputFileUpload setInfo={setInfo} info={info} />
          </div>
        </Box>

        <Stack sx={{ width: "100%", padding: "0 100px" }} spacing={3}>
          <TextField
            value={info.title}
            onChange={(e) =>
              setInfo({
                ...info,
                title: e.target.value,
              })
            }
            fullWidth
            label="Title"
            variant="standard"
          />
          <TextField
            value={info.description}
            onChange={(e) =>
              setInfo({
                ...info,
                description: e.target.value,
              })
            }
            fullWidth
            label="Description"
            variant="standard"
          />

          <TextField
            value={info.category}
            onChange={(e) => {
              console.log(e.target.value);
              setInfo({
                ...info,
                category: e.target.value,
              });
            }}
            id="outlined-select-currency-native"
            select
            label="Category select"
            defaultValue="ballad"
            SelectProps={{
              native: true,
            }}
            helperText="Please select your category"
          >
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Step2;
