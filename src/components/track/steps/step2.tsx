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

function InputFileUpload() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}

const currencies = [
  {
    value: "ballad",
    label: "Ballad",
  },
  {
    value: "chill",
    label: "Chill",
  },
];

interface IProps {
  trackUpload: {
    fileName: string;
    percent: number;
  };
}

const Step2 = (props: IProps) => {
  const { trackUpload } = props;
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
          ></div>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <InputFileUpload />
          </div>
        </Box>

        <Stack sx={{ width: "100%", padding: "0 100px" }} spacing={3}>
          <TextField fullWidth label="Title" variant="standard" />
          <TextField fullWidth label="Description" variant="standard" />
          <TextField fullWidth label="Category" variant="standard" />
          <TextField
            id="outlined-select-currency-native"
            select
            label="Native select"
            defaultValue="ballad"
            SelectProps={{
              native: true,
            }}
            helperText="Please select your category"
          >
            {currencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <Button variant="contained">Save</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Step2;
