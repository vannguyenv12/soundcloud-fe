"use client";

import { useTrackContext } from "@/lib/track.wrapper";
import { useHasMounted } from "@/utils/customHook";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import * as React from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function Footer() {
  const playerRef = React.useRef(null);

  const hasMounted = useHasMounted();

  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  if (!hasMounted) return <></>;

  console.log("check track", currentTrack);

  (async () => {
    try {
      if (currentTrack.isPlaying) {
        //@ts-ignore
        await playerRef?.current?.audio?.current?.play();
      } else {
        //@ts-ignore
        await playerRef?.current?.audio?.current?.pause();
      }
    } catch (error: any) {
      console.log("failed to play ", error);
    }
  })();

  return (
    <div style={{ marginTop: "150px" }}>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
      >
        <Container
          sx={{
            display: "flex",
            gap: 10,
          }}
        >
          <AudioPlayer
            ref={playerRef}
            layout="horizontal-reverse"
            autoPlay
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${currentTrack.trackUrl}`}
            onPlay={(e) =>
              setCurrentTrack({ ...currentTrack, isPlaying: true })
            }
            onPause={(e) =>
              setCurrentTrack({ ...currentTrack, isPlaying: false })
            }
            style={{
              boxShadow: "unset",
            }}
            onError={(event) => console.log(event?.target)}
          />

          <div
            style={{
              color: "black",
              minWidth: 100,
            }}
          >
            <h4>{currentTrack.description}</h4>
            <p style={{ whiteSpace: "nowrap" }}>{currentTrack.title}</p>
          </div>
        </Container>
      </AppBar>
    </div>
  );
}
