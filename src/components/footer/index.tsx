"use client";

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
  const hasMounted = useHasMounted();

  if (!hasMounted) return <></>;

  return (
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
          autoPlay
          src="https://a128-z3.zmdcdn.me/7252053b66d9ca459205d8c2ac5a1b1e?authen=exp=1716227087~acl=/7252053b66d9ca459205d8c2ac5a1b1e/*~hmac=3c02b1bce75e89c291015a8471e32c8b"
          onPlay={(e) => console.log("onPlay")}
          style={{
            boxShadow: "unset",
          }}
        />

        <div
          style={{
            color: "black",
            minWidth: 100,
          }}
        >
          <h4>Thành Đạt</h4>
          <p style={{ whiteSpace: "nowrap" }}>Đắng lòng chữ thương</p>
        </div>
      </Container>
    </AppBar>
  );
}
