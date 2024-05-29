"use client";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Stack } from "@mui/material";
import { sendRequest } from "@/utils/api";
import { useTrackContext } from "@/lib/track.wrapper";
import PauseIcon from "@mui/icons-material/Pause";
import Link from "next/link";

export default function ProfileTrack(props: any) {
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  const theme = useTheme();

  return (
    <Stack
      direction="row"
      useFlexGap
      spacing={4}
      flexWrap={"wrap"}
      marginTop={10}
    >
      {props.tracks &&
        props.tracks.data.map((track: any) => {
          return (
            <Box>
              <Card sx={{ display: "flex" }} key={track.id}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", width: 400 }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Link
                      href={`/track/${track.id}?audio=http://localhost:5000/uploads/${track.trackUrl}&id=${track.id}`}
                    >
                      <Typography component="div" variant="h5">
                        {track.title}
                      </Typography>
                    </Link>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {track.description}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <IconButton aria-label="previous">
                      {theme.direction === "rtl" ? (
                        <SkipNextIcon />
                      ) : (
                        <SkipPreviousIcon />
                      )}
                    </IconButton>
                    <IconButton
                      aria-label="play/pause"
                      onClick={() => {
                        if (
                          currentTrack.id === track.id &&
                          currentTrack.isPlaying
                        ) {
                          setCurrentTrack({ ...track, isPlaying: false });
                        } else {
                          setCurrentTrack({ ...track, isPlaying: true });
                        }
                      }}
                    >
                      {currentTrack.id === track.id &&
                      currentTrack.isPlaying ? (
                        <PauseIcon sx={{ height: 38, width: 38 }} />
                      ) : (
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                      )}
                    </IconButton>
                    <IconButton aria-label="next">
                      {theme.direction === "rtl" ? (
                        <SkipPreviousIcon />
                      ) : (
                        <SkipNextIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={track.imgUrl}
                  alt="Live from space album cover"
                />
              </Card>
            </Box>
          );
        })}
    </Stack>
  );
}
